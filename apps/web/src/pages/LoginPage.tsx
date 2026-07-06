import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { LogoIcon } from "@/components/shared/LogoIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      toast.success("Welcome back! 🎉");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* ─── Animated Background ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-zinc-950" />

      {/* Mesh gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Login Card ─── */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-scale-in">
        <div
          className={cn(
            "rounded-2xl p-8",
            "bg-black/40 backdrop-blur-2xl",
            "border border-white/10",
            "shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)]"
          )}
        >
          {/* ─── Logo & Title ─── */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-orange-500/20">
                <LogoIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Zuno
            </h1>
            <p className="text-sm text-white/40 mt-1.5">
              Admin Dashboard — Sign in to continue
            </p>
          </div>

          {/* ─── Login Form ─── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@zuno.com"
                  className={cn(
                    "w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white",
                    "bg-white/[0.06] border border-white/[0.08]",
                    "placeholder:text-white/20",
                    "focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08]",
                    "transition-all duration-200"
                  )}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    "w-full h-11 pl-10 pr-12 rounded-xl text-sm text-white",
                    "bg-white/[0.06] border border-white/[0.08]",
                    "placeholder:text-white/20",
                    "focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08]",
                    "transition-all duration-200"
                  )}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-11 rounded-xl text-sm font-semibold text-white",
                "gradient-primary",
                "hover:opacity-90 active:scale-[0.98]",
                "transition-all duration-200",
                "flex items-center justify-center gap-2",
                "shadow-lg shadow-violet-500/25",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* ─── Demo Credentials ─── */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-[11px] text-white/30 text-center mb-3 uppercase tracking-wider font-medium">
              Demo Credentials
            </p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { email: "admin@zuno.com", pass: "admin123", role: "Super Admin" },
                { email: "rajesh@goldenspoon.com", pass: "owner123", role: "Restaurant Owner" },
              ].map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword(cred.pass);
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg text-left",
                    "bg-white/[0.03] border border-white/[0.05]",
                    "hover:bg-white/[0.06] transition-colors duration-200",
                    "group"
                  )}
                >
                  <div>
                    <p className="text-xs text-white/60 font-medium">
                      {cred.role}
                    </p>
                    <p className="text-[10px] text-white/25">
                      {cred.email}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-white/20 mt-6">
          © 2025 Zuno. All rights reserved.
        </p>
      </div>
    </div>
  );
}
