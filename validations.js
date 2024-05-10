import { body} from 'express-validator'

export const registerValidation = [
    body('phone', 'Номер телефона указан неверно').isMobilePhone(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({min: 5}),
    body('firstName','Имя должно содержать минимум 2 буквы').isLength({min: 2}),
    body('surname','Фамилия должна содержать минимум 2 буквы').isLength({min: 2}),
    body('secondName','Отчество должно содержать минимум 2 буквы').optional().isLength({min:2}),
];

export const loginValidation = [
    body('phone', 'Номер телефона указан неверно').isMobilePhone(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({min: 5}),
];

export const orderValidation = [
    body('phone', 'Номер телефона указан неверно').isMobilePhone(),
    body('firstName','Имя должно содержать минимум 2 буквы').isLength({min: 2}),
    body('surname','Фамилия должна содержать минимум 2 буквы').isLength({min: 2}),
    body('secondName','Отчество должно содержать минимум 2 буквы').optional().isLength({min:2}),
];

