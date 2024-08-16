import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AvatarForm = ({ resturantData, resturantFetchHandler, Resturant }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        // const options = { method: "PATCH", body: JSON.stringify(data) };
        // const url = `http://localhost:3000/api/user/${User.user._id}`;
        // const response = await fetch(url, options);
        // const result = await response.json();

        // if (result.status) {
        //     toast.success(`${result.message}`);
        //     userFetchHandler();
        // } else {
        //     console.log(result.result);
        //     toast.error(`${result.message}(${result.result})`);
        // }
    };
    return (
        <div className="update-row">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="input-row">
                    <label htmlFor="">avatar url:</label>
                    <input
                        type="text"
                        className="input"
                        defaultValue={resturantData?.avatar}
                        {...register("avatar", {
                            required: {
                                value: true,
                                message: "Provide an Avatar Url to update",
                            },
                        })}
                    />
                </div>
                <button type="submit">update</button>
            </form>
        </div>
    );
};

export default AvatarForm;
