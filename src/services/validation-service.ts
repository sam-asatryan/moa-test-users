const validate = (data: {}, requiredFields: string[]) => {
    const result: { isValid: boolean, invalidFields: string[] } = {
        isValid      : true,
        invalidFields: [],
    }

    for (const key of requiredFields) {
        // @ts-ignore
        if (data[key] === undefined || data[key] === '' || data[key] === null) {
            result.isValid = false
            result.invalidFields.push(key)
        }
    }

    return result
}

export {
    validate,
}