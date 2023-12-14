"use client";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import AuthSocialButton from "./auth-social-button";
import { BsGithub, BsGoogle, BsDiscord } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type TVariant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<TVariant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  // 提交
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then((res) => {
          toast.success("Create user successfully");
        })
        .then(() => {
          signIn("credentials", data);
        })
        .catch(() => {
          toast.error("Sth went wrong!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((cb) => {
          cb?.error && toast.error(cb.error);
          cb?.ok && !cb.error && toast.success("Logged in!");
          router.push("/users");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {
      redirect: false,
    })
      .then((cb) => {
        cb?.error && toast.error(cb.error);
        cb?.ok && !cb.error && toast.success("Logged in!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const toggleVariant = useCallback(() => {
    setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
  }, [variant]);
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status]);
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-primary-content px-4 py-8 shaodw sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              disabled={isLoading}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email address"
            register={register}
            disabled={isLoading}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            disabled={isLoading}
            errors={errors}
            type="password"
          />
          <Button
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            actionType="submit"
            responsive
          >
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="flex flex-col w-full">
          <div className="divider divider-primary">Or continue with</div>
        </div>
        <div className="mt-6 flex gap-2 justify-center">
          <AuthSocialButton
            icon={BsGithub}
            onClick={() => socialAction("github")}
            socialName="github"
          />
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction("google")}
            socialName="google"
          />
          <AuthSocialButton
            icon={BsDiscord}
            onClick={() => socialAction("discord")}
            socialName="discord"
          />
        </div>
        <div className="flex gap-2 justify-center text-sm mt-5 px-2 text-gray-500 items-center">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          {/* <button className="btn btn-active btn-link">Link</button> */}
          <Button type="link" size="xs" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
