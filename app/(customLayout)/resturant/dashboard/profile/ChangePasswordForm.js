import { signOut } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChangePasswordForm = ({ resturantData }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { oldPassword, newPassword, confirmPassword } = data;
        if (newPassword !== confirmPassword) {
            toast.error("Confirm password not matched");
        } else {
            const credentials = {
                oldPassword,
                newPassword,
                email: resturantData.email,
            };
            const options = {
                method: "PATCH",
                body: JSON.stringify(credentials),
            };
            const url = `http://localhost:3000/api/resturant/reset-password/${resturantData._id}`;
            const response = await fetch(url, options);
            const result = await response.json();
            if (result.status) {
                toast.success(`${result.result}`);
                signOut();
            } else {
                toast.error(`${result.result}`);
            }
        }
    };

    return (
        <div className="row">
            <form
                className="user-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div className="input-row extend edit">
                    <label htmlFor="">old password:</label>
                    <input
                        type="text"
                        className="input"
                        {...register("oldPassword", {
                            required: {
                                value: true,
                                message: "Old password is requird",
                            },
                        })}
                    />
                    {errors?.oldPassword && (
                        <span className="input-error">
                            {errors?.oldPassword?.message}
                        </span>
                    )}
                </div>

                <div className="input-row extend edit">
                    <label htmlFor="">new password:</label>
                    <input
                        type="text"
                        className="input"
                        {...register("newPassword", {
                            required: {
                                value: true,
                                message: "New Password is requird",
                            },
                        })}
                    />
                    {errors?.newPassword && (
                        <span className="input-error">
                            {errors?.newPassword?.message}
                        </span>
                    )}
                </div>

                <div className="input-row extend edit">
                    <label htmlFor="">confirm password:</label>
                    <input
                        type="text"
                        className="input"
                        {...register("confirmPassword", {
                            required: {
                                value: true,
                                message: "Confirm password is requird",
                            },
                        })}
                    />
                    {errors?.confirmPassword && (
                        <span className="input-error">
                            {errors?.confirmPassword?.message}
                        </span>
                    )}
                </div>

                <div className="submit-row extend show">
                    <button type="submit">change password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
