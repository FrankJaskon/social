import { LocaleType } from "./en";

import { pluralizeRu } from "@/shared/helpers/create-pluralize";
import { SidebarLinkText } from '@/widgets/sidebar'

export const ru: LocaleType = {
  homePage: {
    test: "Просто тест"
  },
  errors: {
    noResponse: "Сервер не отвечает",
    requestFailed: "Ошибка при выполнении запроса",
    loginIncorrectData: "Неправильный email или пароль",
    loginFailed: "Ошибка входа",
    loginIncorrectPassword: `Неправильный пароль. Попробуйте ещё раз`,
    regexUsername: "Имя пользователя должно содержать 1-9, a-z, A-Z, . _ -",
    nonemptyUsername: "Введите имя пользователя",
    minUsername: "Длинна имени пользователя должна быть не менее 6 символов",
    maxUsername: "Максимальная длина имени пользователя не должна превышать 30 символов",
    regexEmail: "Электронная почта должна соответствовать типу example@example.com",
    nonemptyEmail: "Введите адрес электронной почты",
    nonemptyPassword: "Введите пароль",
    nonemptyConfirm: "Повторно введите пароль",
    regexPasswordMustContain: "Пароль должен содержать следующие символы 1-9, a-z, A-Z, ! \" # $ % & ' ( ) * + , - . / :" +
      " ; < = > ? @ [ \\ ] ^ _` { | } ~",
    minPassword: "Пароль должен должен быть длинной не менее 6 символов",
    maxPassword: "Пароль должен быть не более 20 символов",
    passwordsMustMatch: "Пароли должны совпадать",
    emailNotFound: "Пользователь с такими электронным адресом не существует",
    requiredTerms: "Нужно подтвердить согласие с правилами сервиса и политикой безопасности",
    emailExists: "Пользователь с такой электронной почтой уже существует",
    usernameExists: "Пользователь с таким именем пользователя уже существует",
  },
  auth: {
    emailLabel: "Электронная почта",
    emailSent: "Письмо с подтверджением отправлено",
    passwordLabel: "Пароль",
    forgotPassword: "Не помню пароль",
    haveAccount: `Уже есть аккаунт?`,
    notHaveAccount: `Ещё нет аккаунта?`,
    signinTitle: "Вход",
    signin: "Войти",
    signup: "Зарегистрироваться",
    username: "Имя пользователя",
    passwordConfirmation: "Подтверждение пароля",
    termsOfService: "Условиями сервиса",
    privacyPolicy: "Политикой конфиденциальности",
    termsOfServiceTitle: "Условия Сервиса",
    privacyPolicyTitle: "Политика Конфиденциальности",
    loginLoader: "Вход...",
    passwordRecoveryTitle: "Забыл Пароль",
    passwordRecoveryDescription: "Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции",
    backToLogin: 'Вернуться к Входу',
    backToRegistration: 'Вернуться к регистрации',
    sendLink: "Отправить Ссылку",
    sendLinkAgain: "Отправить Ссылку ещё раз",
    sendLoader: "Отправка...",
    signupLoader: "Регистрация...",
    newPasswordTitle: "Создание Нового Пароля",
    newPasswordButton: "Создать новый пароль",
    newPasswordDescription: "Пароль должен быть от 6 до 20 символов",
    sentCodeToEmail(email: string) {
      return `Мы отправили ссылку для подтверджения на электронную почту ${email}`
    },
    logOutModal(email: string) {
      return `Вы действительно хотите выйти из аккаунта “${email}”?`
    },
    termsPolicyLinks: "Я согласен с  <1>terms</1> и <2>policy</2>",
    congratulations: "Поздравляем!",
    emailConfirmed: "Ваша почта подтверджена",
    emailExpired: "Срок действия ссылки подтверждения истёк",
    expiredDescription: "Похоже, что срок действия ссылки истёк. Не переживайте, мы можем выслать ссылку ещё раз",
    resendLink: "Отправить ссылку ещё раз",
  },
  sidebar: {
    links: {
      create: "Создать",
      favorites: "Избранное",
      home: "Главная",
      messenger: "Мессенджер",
      myProfile: "Мой Профиль",
      search: "Поиск",
      statistic: "Статистика"
    } as Record<SidebarLinkText, string>,
    logout: "Выйти"
  },
  english: "Английский",
  russian: "Русский",
  yes: "Да",
  no: "Нет",
  dynamicTest: {
    getDynamicString(name: string) {
      return `Твоё имя ${name}`;
    },
    dynamicStringWithTags: "<1>Blue text</1> и <2>Red text</2> просто тесты",
    getPluralizedForm(count: number) {
      const str = pluralizeRu(count);

      switch (str) {
        case "one":
          return `${count} тест`;
        case "few":
          return `${count} теста`;
        case "many":
          return `${count} тестов`;
      }
    }
  }
};
