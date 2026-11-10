
"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  Sparkles,
  Loader2,
} from "lucide-react"

import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignInPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Email and Password Sign In
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      const email = String(formData.get("email") || "").trim()
      const password = String(formData.get("password") || "")

      if (!email || !password) {
        toast.error("Please enter your email and password.")
        return
      }

      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      })

      if (error) {
        console.error("Sign in error:", error)

        toast.error(
          error.message || "Invalid email or password. Please try again."
        )
        return
      }

      toast.success("Login successful! Redirecting...")

      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1200)

    } catch (error) {
      console.error("Sign in failed:", error)

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  // Google Sign In
  const handleGoogleSignIn = async () => {
    if (googleLoading) return

    setGoogleLoading(true)

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (error) {
        console.error("Google sign in error:", error)

        toast.error(
          error.message || "Google sign in failed. Please try again."
        )

        setGoogleLoading(false)
      }
    } catch (error) {
      console.error("Google sign in failed:", error)

      toast.error("Google sign in failed. Please try again.")

      setGoogleLoading(false)
    }
  }

  return (
    <>
      {/* React Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <main className="relative mt-10 flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12">

        {/* Background Effects */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-100/70 blur-[120px]" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-100/70 blur-[120px]" />

        <div className="relative z-10 w-full max-w-[460px]">

          {/* Brand */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue your journey with us.
            </p>

          </div>

          {/* Sign In Card */}
          <Card className="border border-gray-200 bg-white shadow-xl shadow-gray-200/60">

            <CardContent className="p-6 sm:p-9">

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">

                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>

                  <div className="relative">

                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      autoComplete="email"
                      required
                      className="h-12 border-gray-200 bg-gray-50 pl-10 text-gray-900 placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500"
                    />

                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">

                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>

                  <div className="relative">

                    <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-12 border-gray-200 bg-gray-50 pl-10 pr-12 text-gray-900 placeholder:text-gray-400 focus-visible:border-violet-500 focus-visible:ring-violet-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-violet-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between gap-2">

                  <div className="flex items-center gap-2">

                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                      className="border-gray-300 data-[state=checked]:border-violet-600 data-[state=checked]:bg-violet-600"
                    />

                    <Label
                      htmlFor="remember"
                      className="cursor-pointer text-xs text-gray-500"
                    >
                      Remember me
                    </Label>

                  </div>

                  <Link
                    href="/Auth/ForgotPassword"
                    className="text-xs font-semibold text-violet-600 transition hover:text-violet-700"
                  >
                    Forgot Password?
                  </Link>

                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="h-12 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-base font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:from-violet-500 hover:to-indigo-500"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">

                <Separator className="flex-1 bg-gray-200" />

                <span className="text-xs font-medium text-gray-400">
                  OR CONTINUE WITH
                </span>

                <Separator className="flex-1 bg-gray-200" />

              </div>

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                disabled={googleLoading || loading}
                onClick={handleGoogleSignIn}
                className="h-12 w-full border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
              >

                {googleLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <svg
                    viewBox="0 0 48 48"
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 44c5.6 0 10.3-1.9 13.7-5.2l-6.6-5.1c-1.8 1.2-4.1 2-7.1 2-5.4 0-10-3.7-11.6-8.6H5.6v5.3A20 20 0 0 0 24 44Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M12.4 27.1a12 12 0 0 1 0-7.6v-5.3H5.6a20 20 0 0 0 0 18.2l6.8-5.3Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.6 14.2l6.8 5.3c1.6-4.9 6.2-8.6 11.6-8.6Z"
                    />
                  </svg>
                )}

                {googleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}

              </Button>

              {/* Sign Up Link */}
              <p className="mt-7 text-center text-sm text-gray-500">

                Don&apos;t have an account?{" "}

                <Link
                  href="/auth/signup"
                  className="font-semibold text-violet-600 transition hover:text-violet-700"
                >
                  Create Account
                </Link>

              </p>

            </CardContent>
          </Card>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Secure login · Your privacy matters to us.
          </p>

        </div>
      </main>
    </>
  )
}
