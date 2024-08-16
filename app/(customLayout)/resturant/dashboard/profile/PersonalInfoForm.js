import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PersonalInfoForm = ({
    editState,
    resturantData,
    resturantFetchHandler,
    Resturant,
}) => {
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
        <div className="row">
            <form
                className="user-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
            >
                <div
                    className={`input-row extend ${
                        editState.personal && "edit"
                    }`}
                >
                    <label htmlFor="">resturant name:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.personal}
                        defaultValue={resturantData?.name}
                        {...register("name")}
                    />
                </div>

                <div className={`input-row ${editState.personal && "edit"}`}>
                    <label htmlFor="">contact email address:</label>
                    <input
                        type="text"
                        className="input email"
                        readOnly={!editState?.personal}
                        defaultValue={resturantData?.contactEmail}
                        {...register("contactEmail")}
                    />
                </div>

                <div className={`input-row ${editState.personal && "edit"}`}>
                    <label htmlFor="">contact phone number:</label>
                    <input
                        type="text"
                        className="input"
                        readOnly={!editState?.personal}
                        defaultValue={resturantData?.contactNumber}
                        {...register("contactNumber")}
                    />
                </div>

                <div
                    className={`input-row extend ${
                        editState.personal && "edit"
                    }`}
                >
                    <label htmlFor="">resturant short description:</label>
                    <textarea
                        type="text"
                        className="input email"
                        readOnly={!editState?.personal}
                        defaultValue={resturantData?.description}
                        {...register("description")}
                    />
                </div>
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
