export const phoneNumberCheck = (phone: string) => {
    if (phone.length !== 10) throw new Error('Invalid phone number');
}