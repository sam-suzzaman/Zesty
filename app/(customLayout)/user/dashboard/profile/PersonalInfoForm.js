import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PersonalInfoForm = ({ editState, userInfo, userFetchHandler, User }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const options = { method: "PATCH", body: JSON.stringify(data) };
        const url = `http://localhost:3000/api/user/${User.user._id}`;
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.status) {
            toast.success(`${result.message}`);
            userFetchHandler();
        } else {
            console.log(result.result);
            toast.error(`${result.message}(${result.result})`);
        }
    };
    return (
        <div className="row">
            <form
                className="user-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div className={`input-row ${editState.personal && "edit"}`}>
                    <label htmlFor="">user name:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.personal}
                        defaultValue={userInfo?.username}
                        {...register("username")}
                    />
                </div>

                <div className={`input-row ${editState.personal && "edit"}`}>
                    <label htmlFor="">email:</label>
                    <input
                        type="text"
                        className="input email"
                        readOnly={true}
                        defaultValue={userInfo?.email}
                    />
                    <span className="input-err-msg">
                        it can't be changed. ready only value.
                    </span>
                </div>

                <div className={`input-row ${editState.personal && "edit"}`}>
                    <label htmlFor="">phone number:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.personal}
                        defaultValue={userInfo?.phoneNumber}
                        {...register("phoneNumber")}
                    />
                </div>

                <div className={`input-row ${editState.personal && "edit"}`}>
                    <label htmlFor="">gender:</label>
                    <input
                        type="text"
                        className="input email"
                        defaultValue={userInfo?.gender}
                        {...register("gender")}
                    />
                </div>
                {/* <div
                    className={`input-row extend ${
                        editState.personal && "edit"
                    }`}
                >
                    <label htmlFor="">email address:</label>
                    <input
                        type="text"
                        className="input email"
                        readOnly={!editState?.personal}
                        defaultValue={userInfo?.email}
                        {...register("email")}
                    />
                </div> */}
                <div
                    className={`submit-row extend ${
                        editState?.personal && "show"
                    }`}
                >
                    <button type="submit">update now</button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfoForm;
