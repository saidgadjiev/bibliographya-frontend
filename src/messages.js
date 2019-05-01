let petrovich = require('petrovich')

export const CANT_PUBLISH = 'Вы не можете опубликовать пустую биографию. ' +
  'Расскажите нам о себе что нибудь чтобы мы могли ее опубликовать.'

export const PUBLISHED = 'Ваша биография опубликована. Вы можете ее увидеть в списке биографий.'

export const UNPUBLISHED = 'Ваша биография снята с публикации. Она не доступна из списка биографий.'

export const SERVER_ERROR = 'Произошла ошибка. Попробуйте повторить позже.'

export const TOO_MANY_REQUESTS = 'Вы совершили слишком много одинаковых действий. Повторите попытку позже.'

export const RESOURCE_NOT_FOUND = 'Ресурс не найден.'

export const WELCOME = 'Опубликуйте биографию в разделе Моя биография, чтобы она отображалась в списке биографий.'

export const WELCOME_TITLE = 'Добро пожаловать!'

export const BUG_CREATED = 'Ошибка создана. Наши разработчики приступят к ее исправлению в самое ближайшее время.'

export const CATEGORY_CREATED = 'Категория создана.'

export const CATEGORY_CHANGED = 'Категория изменена.'

export const INTERNET_ERROR = 'Проверьте подключение к интернету.'

export const PASSWORD_CHANGE_SUCCESS = 'Пароль успешно изменен.'

export const EMAIL_CHANGE_SUCCESS = 'Почта успешно изменена.'

export const PHONE_CHANGE_SUCCESS = 'Телефон успешно изменен.'

export const EMAIL_VERIFY_SUCCESS = 'Почта успешно подтверждена.'

export function getShareDescription (firstName, lastName, middleName) {
  let gender = 'androgynous'

  if (middleName) {
    gender = petrovich.detect_gender(middleName)
  }
  let petrovichObject = {
    gender: gender,
    first: firstName,
    middle: middleName,
    last: lastName
  }

  petrovichObject = petrovich(petrovichObject, 'genitive')

  let message = ' Перейдите и прочитайте про @bold' + petrovichObject.last + ' ' + petrovichObject.first

  if (middleName) {
    message += ' ' + petrovichObject.middle
  }

  message += '@/bold.'

  return message
}

export const ENABLE_COMMENTS = 'Включить комментарии'

export const DISABLE_COMMENTS = 'Выключить комментарии'
