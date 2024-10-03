const rules = {
    email: [
        { required: true, message: 'O e-mail é obrigatório', trigger: 'blur' },
        { type: 'email', message: 'Por favor insira um e-mail válido', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: 'A senha é obrigatória', trigger: 'blur' },
        { min: 8, message: 'A senha deve ter no mínimo 8 caracteres', trigger: 'blur' }
    ],
    minLength: [
        { required: true, message: 'Campo é obrigatório', trigger: 'blur' },
        { min: 2, message: 'O campo deve conter 2 no mínimo 2 caracter', trigger: 'blur',  },
    ],
    required: [
        { required: true, message: 'Campo é obrigatório', trigger: 'blur' }
    ]
}

export default {
    email: rules.email,
    password: rules.password,
    minLength: rules.minLength,
    required: rules.required
}