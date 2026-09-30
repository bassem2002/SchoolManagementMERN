const { test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/Utilisateur');
const auth = require('../services/authServices');
const users = require('../services/userServices');
const { getJwtSecret } = require('../config/jwt');
const originalSecret = process.env.JWT_SECRET;
const id = '507f1f77bcf86cd799439011';
const otherId = '507f1f77bcf86cd799439012';
const secret = randomBytes(32).toString('hex');
afterEach(() => {
  if (originalSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalSecret;
});

test('JWT secret is required without fallback', () => {
  delete process.env.JWT_SECRET;
  assert.throws(getJwtSecret);
  process.env.JWT_SECRET = '   ';
  assert.throws(getJwtSecret);
});

test('login signs an expiring JWT and never serializes the hash', async t => {
  process.env.JWT_SECRET = secret;
  const hash = await bcrypt.hash('test-password', 4);
  const user = new User({ _id: id, nom: 'Test', email: 'test@example.invalid', mot_de_passe: hash });
  t.mock.method(User, 'findOne', () => ({ select(field) {
    assert.equal(field, '+mot_de_passe');
    return Promise.resolve(user);
  } }));
  const result = await auth.login({ email: user.email, mot_de_passe: 'test-password' });
  const payload = jwt.verify(result.token, secret);
  assert.equal(payload.exp - payload.iat, 3600);
  assert.equal(payload.mot_de_passe, undefined);
  assert.equal(JSON.parse(JSON.stringify(result)).user.mot_de_passe, undefined);
  assert.equal(User.schema.path('mot_de_passe').options.select, false);
  assert.equal(user.toObject().mot_de_passe, undefined);
  await assert.rejects(auth.login({ email: user.email, mot_de_passe: 'wrong' }));
});

test('registration hashes passwords, hides hashes and does not log user data', async t => {
  t.mock.method(User, 'findOne', async () => null);
  t.mock.method(User.prototype, 'save', async function () { return this; });
  const log = t.mock.method(console, 'log', () => {});
  const user = await auth.register({ nom: 'Test', email: 'test@example.invalid', mot_de_passe: 'test-password' });
  assert.ok(await bcrypt.compare('test-password', user.mot_de_passe));
  assert.equal(JSON.parse(JSON.stringify(user)).mot_de_passe, undefined);
  assert.equal(log.mock.callCount(), 0);
});

test('ownership, sensitive fields and MongoDB operators are protected', async t => {
  const update = t.mock.method(User, 'findByIdAndUpdate', async (id, data, options) => ({ id, data, options }));
  const actor = { _id: id, role: 'student' };
  await assert.rejects(users.updateUtilisateur(otherId, { nom: 'Attack' }, actor), { status: 403 });
  for (const field of ['role', 'status']) {
    await assert.rejects(users.updateUtilisateur(id, { [field]: 'admin' }, actor), { status: 403 });
  }
  assert.equal(update.mock.callCount(), 0);
  const result = await users.updateUtilisateur(id, {
    nom: 'Allowed', _id: otherId, unknown: true, $set: { role: 'admin' },
    'role.value': 'admin', mot_de_passe: 'new-password',
  }, actor);
  assert.deepEqual(Object.keys(result.data.$set).sort(), ['mot_de_passe', 'nom']);
  assert.ok(await bcrypt.compare('new-password', result.data.$set.mot_de_passe));
  assert.equal(result.options.runValidators, true);
  const adminResult = await users.updateUtilisateur(otherId, { role: 'teacher', status: 'inactive' }, { _id: id, role: 'admin' });
  assert.deepEqual(adminResult.data.$set, { role: 'teacher', status: 'inactive' });
});

test('HTTP routes reject unauthorized, expired, forged and stale privileges', async t => {
  process.env.JWT_SECRET = secret;
  let account = new User({ _id: id, nom: 'Test', email: 'test@example.invalid', role: 'student' });
  t.mock.method(User, 'findById', async () => account);
  const update = t.mock.method(User, 'findByIdAndUpdate', async () => account);
  const app = express();
  app.use(express.json());
  app.use('/api/users', require('../routes/utlisateurRoutes'));
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const url = `http://127.0.0.1:${server.address().port}/api/users/update_user/`;
  const token = (payload = {}, options = {}, key = secret) => jwt.sign({ _id: id, role: 'admin', ...payload }, key, { expiresIn: '1h', ...options });
  const put = (target, bearer, body = { nom: 'Updated' }) => fetch(url + target, {
    method: 'PUT', headers: { 'Content-Type': 'application/json', ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}) }, body: JSON.stringify(body),
  });
  assert.equal((await put(id)).status, 401);
  assert.equal((await put(id, token({}, { expiresIn: -1 }))).status, 401);
  assert.equal((await put(id, token({}, {}, randomBytes(32).toString('hex')))).status, 401);
  assert.equal((await put(id, jwt.sign({ _id: id }, secret))).status, 401);
  assert.equal((await put(otherId, token())).status, 403);
  assert.equal((await put(id, token(), { role: 'admin' })).status, 403);
  assert.equal(update.mock.callCount(), 0);
  assert.equal((await put(id, token())).status, 200);
  account.role = 'admin';
  assert.equal((await put(otherId, token())).status, 200);
  account.status = 'inactive';
  assert.equal((await put(id, token())).status, 401);
  account = null;
  assert.equal((await put(id, token())).status, 401);
});

test('nested populated user documents do not expose password hashes', async t => {
  const Group = require('../models/group');
  const user = new User({ _id: id, nom: 'Test', mot_de_passe: 'private-hash' });
  t.mock.method(User, 'find', () => ({ exec: async () => [user] }));
  const group = new Group({ nom: 'Test', eleves: [id] });
  await group.populate('eleves');
  const result = JSON.parse(JSON.stringify(group));
  assert.equal(result.eleves[0].nom, 'Test');
  assert.equal(result.eleves[0].mot_de_passe, undefined);
});
