// 自定义密码验证
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint()
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    // 密码长度必须大于等于6， 密码长度必须小于等于16， 密码必须包含数字， 密码必须包含字母
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/;
    return regex.test(password);
  }

  defaultMessage() {
    // 错误提示信息
    return "The password must contain both numbers and letters, and its length must be between 6 and 16 characters.";
  }
}
