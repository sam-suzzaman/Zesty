export const GetAllHandler = async (url) => {
    const response = await fetch(url);
    const result = await response.json();

    return result;
};

export const GetSingleHandler = async (url) => {
    const response = await fetch(url);
    const result = await response.json();

    return result;
};
