export default interface IProps {
    label: string
    placeholder: string
    disabled: boolean
    clearable: boolean
    type: 'text' | 'password' | 'email' | 'number'
}