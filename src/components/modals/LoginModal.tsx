"use client"

import { signIn } from "next-auth/react"
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useRegisterModal from "@/hooks/useRegisterModal"
import useLoginModal from "@/hooks/useLoginModal"

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "./Button"
import { useRouter } from "next/navigation"

const LoginModal = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {

      const callback = await signIn('credentials', { ...data, redirect: false })
      if (callback?.ok) {
        toast.success("Logged in")
        // router.refresh()
        location.reload()
      }
      if (callback?.error) {
        toast.error(callback.error)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account"
        center
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col">
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Button
          outline
          label="Continue with Google"
          icon={FcGoogle}
          onClick={() => { }}
        />
        <Button
          outline
          label="Continue with Github"
          icon={AiFillGithub}
          onClick={() => { }}
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center gap-2 justify-center">
          <div>
            Already have an account?
          </div>
          <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">
            Log in
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal