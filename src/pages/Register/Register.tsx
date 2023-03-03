import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import classNames from "classnames";
import { toastOptionsErr, toastOptionsSuccess } from "../../App";
import { toast, ToastContainer } from "react-toastify";
import { http, setStoreJSON, USER_LOGIN } from "../../utils/setting";
import backgroundImageRegister from "../../assets/img/banner/anhBienDep.jpg";
import { userRegister } from "../../utils/type/TypeUser";


type Props = {};

export default function Register({}: Props) {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);

  const schema = object({
    email: string()
      .required("Email không được để trống")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
        message: "Email phải có định dạng test@gmail.com",
      }),
    passWord: string().required("Mật khẩu không được để trống"),
    // .matches(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,50})$/g, {
    //   message:
    //     "Mật khẩu tối thiểu 8 kí tự , gồm ít nhất 1 chữ cái , 1 số , không kí tự đặc biệt",
    // }),
    name: string()
      .required("Tên không được để trống")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
        {
          message: "Tên sai định dạng",
        }
      ),
    phoneNumber: string()
      .required("Số điện thoại không được để trống")
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
        message: "Số điện thoại không đúng định dạng",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegister>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values: userRegister) => {
    let result = await http.post("/Users/signup", values);
    if (result.status === 200) {
      await setStoreJSON(USER_LOGIN, result.data);
      toast.success("Đăng kí thành công", toastOptionsSuccess);
      navigate("/user/login");
    } else {
      toast.error("Hãy Đăng Kí Lại", toastOptionsErr);
    }
  });

  return (
    <>
      <form
        id="form"
        onSubmit={onSubmit}
        style={{
          backgroundImage: `url(${backgroundImageRegister})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-grey-lighter min-h-screen flex flex-col"
      >
        <div className="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2 relative">
          <div className="bg-green-200 rounded-lg px-6 py-8 text-black w-full  ">
            <h1 className="mb-8 text-3xl text-center">Đăng kí tài khoản</h1>
            <div className="sm:flex sm:gap-3">
              <div className=" sm:w-1/2">
                <div className="sm:h-24 h-20">
                  <input
                    {...register("name")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-0 hover:outline-none focus:outline-none"
                    placeholder="Tên"

                  />
                  {errors.name && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="sm:h-24 h-20">
                  <input
                    {...register("email")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-0 hover:outline-none focus:outline-none"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:w-1/2">
                <div className="sm:h-24 h-20 ">
                  <input
                    {...register("phoneNumber")}
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-0 hover:outline-none focus:outline-none"
                    placeholder="Số Điện Thoại"
                  />
                  {errors.phoneNumber && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="relative sm:h-24 h-20">
                  <input
                    {...register("passWord")}
                    type={isShowPass ? "text" : "password"}
                    className="block border border-grey-light w-full p-3 rounded mb-0 hover:outline-none focus:outline-none"
                    placeholder="Mật khẩu"
                  />
                  {errors.passWord && (
                    <p className="m-0 text-red-500 text-md italic text-left mt-2">
                      {errors.passWord.message}
                    </p>
                  )}
                  <span
                    onClick={() => setIsShowPass(!isShowPass)}
                    className="absolute top-4 right-1 "
                  >
                    <AiOutlineEye
                      className={classNames("text-lg cursor-pointer", {
                        hidden: !isShowPass,
                      })}
                    />
                    <AiOutlineEyeInvisible
                      className={classNames("text-lg cursor-pointer", {
                        hidden: isShowPass,
                      })}
                    />
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white text-lg hover:bg-green-dark focus:outline-none my-1"
            >
              Tạo tài khoản
            </button>
          </div>
          <div className="text-grey-dark mt-6 text-slate-700 text-xl">
            <button className="mr-2">Nếu có tài khoản ?</button>
            <button
              className="hover:text-blue-700"
              onClick={() => {
                navigate("/user/login");
              }}
            >
              Đăng Nhập
            </button>
          </div>
        </div>
        
      </form>
      <ToastContainer />
    </>
  );
}
