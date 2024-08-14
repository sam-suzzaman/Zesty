import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddressForm = ({ editState, userInfo, User, userFetchHandler }) => {
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
                <div className={`input-row ${editState.address && "edit"}`}>
                    <label htmlFor="">Address:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.address}
                        defaultValue={userInfo?.address}
                        {...register("address")}
                    />
                </div>

                <div className={`input-row ${editState.address && "edit"}`}>
                    <label htmlFor="">delivary Address:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.address}
                        defaultValue={userInfo?.delivaryAddress}
                        {...register("delivaryAddress")}
                    />
                </div>

                <div className={`input-row ${editState.address && "edit"}`}>
                    <label htmlFor="">city name:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.address}
                        defaultValue={userInfo?.cityName}
                        {...register("cityName")}
                    />
                </div>

                <div className={`input-row ${editState.address && "edit"}`}>
                    <label htmlFor="">city code:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.address}
                        defaultValue={userInfo?.cityCode}
                        {...register("cityCode")}
                    />
                </div>

                <div
                    className={`submit-row extend ${
                        editState?.address && "show"
                    }`}
                >
                    <button type="submit">update now</button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm;
