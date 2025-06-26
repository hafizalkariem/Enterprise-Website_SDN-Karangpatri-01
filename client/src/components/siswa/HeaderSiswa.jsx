import { useUser } from "../../contexts/UserContext";
import { Bell, User } from "lucide-react";
import { useMemo } from "react";

const HeaderSiswa = ({ title = "Dashboard" }) => {
  const user = useUser();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "Selamat pagi";
    if (hour >= 11 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 18) return "Selamat sore";
    return "Selamat malam";
  }, []);

  if (!user) return null;

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-blue-100 text-lg">
              {greeting}, <span className="font-semibold">{user.name}</span> 👋
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            {user.foto ? (
              <img
                src={user.foto}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSiswa;
