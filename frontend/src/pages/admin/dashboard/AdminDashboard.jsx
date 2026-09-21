import React, { useEffect, useState } from "react";
import adminServices from "../../../services/adminServices";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function AdminDashboard() {
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchAllSessions = async () => {
    let res = await adminServices.get_all_lessons();
    setSessions(res.data);
  };

  const fetchAllUsers = async () => {
    let res = await adminServices.get_users();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchAllSessions();
    fetchAllUsers();
  }, []);

  // === Répartition utilisateurs par rôle ===
  const userByRole =
    users.length > 0 &&
    users.reduce((acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    }, {});
  const userRoleData = Object.keys(userByRole).map((r) => ({
    name: r,
    value: userByRole[r],
  }));

  // === Répartition des séances par matière ===
  const sessionsByMatiere = sessions.reduce((acc, s) => {
    const matiere = s.matiere_id?.nomMatiere || "Inconnue";
    acc[matiere] = (acc[matiere] || 0) + 1;
    return acc;
  }, {});
  const matiereData = Object.keys(sessionsByMatiere).map((m) => ({
    name: m,
    count: sessionsByMatiere[m],
  }));

  // === Taux de réalisation des séances (par status) ===
  const sessionsByStatus = sessions.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});
  const statusData = Object.keys(sessionsByStatus).map((st) => ({
    name: st,
    value: sessionsByStatus[st],
  }));


const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];


const sessionsByMonth = sessions.reduce((acc, s) => {
  const monthIndex = new Date(s.date).getMonth();
  acc[monthIndex] = (acc[monthIndex] || 0) + 1;
  return acc;
}, {});

const monthData = months.map((m, i) => ({
  month: m,
  count: sessionsByMonth[i] || 0,
}));




  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9b59b6"];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Répartition utilisateurs */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4 text-center">
          Répartition utilisateurs
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={userRoleData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label
            >
              {userRoleData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Séances par matière */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4 text-center">
          Séances par matière
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={matiereData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Taux de réalisation des séances */}
      <div className="bg-white shadow-lg rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4 text-center">
          Taux de réalisation
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Répartition des séances par mois */}
      <div className="bg-white shadow-lg rounded-2xl p-4 col-span-1 md:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-bold mb-4 text-center">
          Répartition des séances par mois
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#0088FE"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;
