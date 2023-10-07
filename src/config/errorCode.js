// 인증되지 않은 사용자
class AuthorizationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 401;
    this.message = message || "Wrong password or email";
  }
}
// 잘못된 요청
class BadRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.message = message || "Bad Request";
  }
}

// 유효하지 않은 params
class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 405;
    this.message = message || "잘못된 params입니다.";
  }
}
//잘못된 데이터 입력값
class WrongFormatError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 422;
    this.message = message || "Wrong parameter format";
  }
}

//없는 게시글
class NotFoundError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 404;
    this.message = message || "Data does not exist";
  }
}

// 데이터 형식 오류
class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 412;
    this.message = message || "Required parameters not satisfied";
  }
}

// 리소스 중복 오류
class DuplicateError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.message = message || "Duplicated data";
  }
}
//예외처리 미대상
class UnknownError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
    this.message = message || "Server Error";
  }
}
//권한없음
class ForbidenError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 403;
    this.message = message || "Permission Denied";
  }
}
//잔액부족
class PaymentError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 402;
    this.message = message || "Insufficient balance";
  }
}

// 리소스 부족 에러
class InsufficientResourcesError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 503; // 503은 서비스를 사용할 수 없음(서비스가 일시적으로 사용 불가능)을 나타냅니다.
    this.message = message || "리소스가 부족하여 요청을 처리할 수 없습니다.";
  }
}

export {
  AuthorizationError,
  BadRequestError,
  InvalidParamsError,
  NotFoundError,
  ValidationError,
  DuplicateError,
  WrongFormatError,
  UnknownError,
  ForbidenError,
  PaymentError,
};
