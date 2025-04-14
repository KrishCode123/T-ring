import Background from "../../assets/login2.png";
import Victory from "../../assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/lib/constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Auth = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePasswordFormat = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const showError = (msg) => {
    toast.error(msg, {
      style: {
        backgroundColor: "#fef2f2",
        color: "#b91c1c",
        fontWeight: "500",
      },
    });
  };

  const validateLogin = () => {
    if (!email.length) return showError("Email is required.");
    if (!validateEmailFormat(email)) return showError("Enter a valid email address.");
    if (!password.length) return showError("Password is required.");
    if (!validatePasswordFormat(password)) return showError("Password must be 8+ chars with a number & symbol.");
    return true;
  };

  const validateSignup = () => {
    if (!email.length) return showError("Email is required.");
    if (!validateEmailFormat(email)) return showError("Enter a valid email address.");
    if (!password.length) return showError("Password is required.");
    if (!validatePasswordFormat(password)) return showError("Password must be 8+ chars with a number & symbol.");
    if (password !== confirmPassword) return showError("Password and Confirm Password should be same.");
    return true;
  };

  const handleLogin = async () => {
    try {
      if (validateLogin()) {
        const response = await apiClient.post(
          LOGIN_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.data.user.id) {
          setUserInfo(response.data.user);
          if (response.data.user.profileSetup) navigate("/chat");
          else navigate("/profile");
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      if (validateSignup()) {
        const response = await apiClient.post(
          SIGNUP_ROUTE,
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 201) {
          setUserInfo(response.data.user);
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 flex items-center justify-center">
      <div className="absolute w-[1000px] h-[1000px] bg-pink-300 opacity-30 blur-[150px] rounded-full top-[-200px] left-[-300px] z-0" />
      <div className="absolute w-[800px] h-[800px] bg-blue-300 opacity-30 blur-[150px] rounded-full bottom-[-200px] right-[-300px] z-0" />

      <div className="relative z-10 h-[80vh] w-[90vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] bg-white bg-opacity-30 backdrop-blur-md shadow-2xl rounded-3xl grid xl:grid-cols-2 overflow-hidden transition-all duration-500 hover:shadow-3xl">
        <div className="flex flex-col gap-10 items-center justify-center p-6 animate-fade-in">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">Welcome</h1>
              <img src={Victory} className="h-[80px] animate-bounce" alt="Victory" />
            </div>
            <p className="font-medium text-center text-gray-600 text-sm sm:text-base">
              Fill in the details to get started with the best chat app!
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full max-w-[400px]">
            <TabsList className="bg-white/30 rounded-full w-full flex justify-between border border-gray-300 overflow-hidden">
              <TabsTrigger
                value="login"
                className="w-1/2 py-3 text-gray-800 font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-1/2 py-3 text-gray-800 font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login" className="mt-8 animate-slide-in">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-5 shadow-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-5 shadow-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="rounded-full p-5 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup" className="mt-8 animate-slide-in">
              <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="flex flex-col gap-5">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-5 shadow-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-5 shadow-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-5 shadow-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button type="submit" className="rounded-full p-5 bg-blue-500 hover:bg-blue-600 transition-all text-white font-semibold">
                  Signup
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden xl:flex justify-center items-center bg-white/20 animate-fade-in">
          <img src={Background} className="h-[90%] object-contain" alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
