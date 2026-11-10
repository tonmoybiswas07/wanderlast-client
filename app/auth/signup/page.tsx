
"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
  CheckCircle2,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"


export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  // Password validation
  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /[0-9]/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ]

  const isPasswordValid = passwordRules.every((rule) => rule.valid)

  // Email Signup
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (loading) return

    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      const name = String(formData.get("name") || "").trim()
      const email = String(formData.get("email") || "").trim()

      if (!name || !email || !password) {
        toast.error("Please fill in all required fields.")
        return
      }

      if (!isPasswordValid) {
        toast.error("Please enter a valid password.")
        return
      }

     const { error } = await authClient.signUp.email({
  name,
  email,
  password,
  image: imageUrl.trim() || undefined,
  callbackURL: "/auth/signin",
})

if (error) {
  toast.error(error.message || "Signup failed.")
  return
}

toast.success("Account created successfully! Please sign in.")

setTimeout(() => {
  router.push("/auth/signin")
}, 1500)

      if (error) {
        toast.error(error.message || "Signup failed.")
        return
      }

      toast.success("Account created successfully!")
     

    } catch (error) {
      console.error("Signup error:", error)

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      )
    } finally {
      setLoading(false)
    }
  }

  // Google Signup
  const handleGoogleSignup = async () => {
    if (googleLoading) return

    setGoogleLoading(true)

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (error) {
        toast.error(error.message || "Google signup failed.")
        setGoogleLoading(false)
      }
    } catch (error) {
      console.error("Google signup error:", error)

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

      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-7 text-center">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-2xl font-bold text-violet-700"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                <Sparkles size={22} />
              </span>
              YourBrand
            </Link>

            <h1 className="text-3xl font-bold text-slate-900">
              Create an Account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign up to get started with your account.
            </p>
          </div>

          <Card className="border-0 shadow-xl shadow-slate-200/60">
            <CardHeader>
              <CardTitle className="text-xl">
                Sign Up
              </CardTitle>
            </CardHeader>

            <CardContent>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Profile Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="image">
                    Profile Image URL
                  </Label>

                  <div className="relative">
                    <ImagePlus className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="image"
                      type="url"
                      placeholder="https://example.com/profile.jpg"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value)
                        setImageError(false)
                      }}
                      className="pl-10"
                    />
                  </div>

                  {imageUrl.trim() && (
                    <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-200">
                        {imageError ? (
                          <UserRound className="h-6 w-6 text-slate-500" />
                        ) : (
                          <Image
                            src={imageUrl}
                            alt="Profile preview"
                            fill
                            unoptimized
                            sizes="48px"
                            className="object-cover"
                            onError={() => setImageError(true)}
                          />
                        )}
                      </div>

                      <p className="text-xs text-slate-500">
                        {imageError
                          ? "Unable to load image preview"
                          : "Profile image preview"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name
                  </Label>

                  <div className="relative">
                    <UserRound className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address
                  </Label>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10 pl-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-600">
                      Password requirements
                    </p>

                    {passwordRules.map((rule) => (
                      <div
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs ${
                          rule.valid
                            ? "text-green-600"
                            : "text-slate-400"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || !isPasswordValid}
                  className="w-full bg-violet-600 hover:bg-violet-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs text-slate-400">
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Google Signup */}
              <Button
                type="button"
                variant="outline"
                disabled={googleLoading}
                onClick={handleGoogleSignup}
                className="w-full"
              >
                {googleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span className="mr-2 font-bold text-blue-600">
                    G
                  </span>
                )}

                Continue with Google
              </Button>

              {/* Sign In */}
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-violet-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>

            </CardContent>
          </Card>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            By creating an account, you agree to our Terms of Service
            and Privacy Policy.
          </p>

        </div>
      </main>
    </>
  )
}
