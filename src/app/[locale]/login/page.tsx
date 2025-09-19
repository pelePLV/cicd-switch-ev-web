'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  loginFormSchema,
  LoginFormValues,
} from '@/lib/validations/form-validation';
import { useLogin } from '@/hooks/use-auth';
import { FloatingLogoBackground } from '@/components/login/floating-logo-background';
import switchFloatingLogo1 from '@/public/images/switch-logo-floating-1.png';
import switchFloatingLogo2 from '@/public/images/switch-logo-floating-2.png';
import switchLogo from '@/public/images/switch-logo.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="font-montserrat min-h-screen bg-gray-50 p-4 pb-10">
      <div className="relative flex min-h-[calc(100vh-2rem)] w-full items-center justify-center overflow-hidden rounded-xl bg-white p-6 shadow-sm md:p-10">
        {/* Floating Logo 1 - Top Right */}
        <FloatingLogoBackground
          src={switchFloatingLogo1}
          position="top-right"
        />

        {/* Floating Logo 2 - Bottom Left */}
        <FloatingLogoBackground
          src={switchFloatingLogo2}
          position="bottom-left"
        />

        {/* Login Form */}
        <div className="z-20 min-h-[500px] w-[500px] max-w-full">
          {/* Logo */}
          <div className="mx-auto h-32 w-40 bg-white">
            <Image
              src={switchLogo}
              alt="switch-logo"
              width={160}
              height={120}
              className="h-full w-full object-contain"
              draggable={false}
            />
          </div>

          {/* Name and Description */}
          <div className="mt-2.5">
            <h1 className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-center text-3xl font-extrabold text-transparent">
              SWITCH
            </h1>
            <p className="text-center text-base font-normal text-green-600">
              Swap batteries and keep moving forward.
            </p>
          </div>

          {/* Title */}
          <div className="mt-20">
            <h2 className="text-center text-xl font-semibold text-gray-800">
              Sign in to access the management system. (Test Auto Deploy)
            </h2>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
              {/* Username Field */}
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="username"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Username
                      </Label>
                      <FormControl>
                        <Input
                          type="text"
                          id="username"
                          placeholder="Enter your username"
                          className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                          disabled={loginMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Password
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-600/10"
                            disabled={loginMutation.isPending}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <FiEyeOff className="h-5 w-5" />
                            ) : (
                              <FiEye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="mt-1 text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Options */}
              <div className="mb-8 flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          id="rememberme"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600"
                        />
                      </FormControl>
                      <Label
                        htmlFor="rememberme"
                        className="cursor-pointer text-sm text-gray-700"
                      >
                        Remember me
                      </Label>
                    </FormItem>
                  )}
                />
                <a
                  href="#"
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="h-12 w-full cursor-pointer rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:from-green-700 hover:to-green-600 active:from-green-800 active:to-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
              </Button>

              {/* Error Message */}
              {loginMutation.isError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-sm text-red-600">
                    {loginMutation.error?.message ||
                      'Login failed. Please try again.'}
                  </p>
                </div>
              )}
            </form>
          </Form>

          {/* Footer */}
          <div className="mt-[200px] w-full text-center">
            <p className="text-sm font-light text-gray-500">
              © 2025 SWITCH Laos. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
