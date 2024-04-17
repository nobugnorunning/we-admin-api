import { BadRequestException } from "@nestjs/common";
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Utils } from "../../utils/utils";

/** 自定义密码验证 */
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

/** 验证sort字段 */
@ValidatorConstraint()
export class SortValidator implements ValidatorConstraintInterface {
  validate(sort: string | string[] | string[][]) {
    // 以逗号分割
    const parsedSort = Utils.parseSortField(sort);
    parsedSort.map((item) => {
      const [field, order] = item;
      if (!field) {
        throw new BadRequestException("The sort field is invalid.");
      }
      if (!order) {
        throw new BadRequestException("The sort order is invalid.");
      }
      if (!["asc", "desc"].includes(order)) {
        throw new BadRequestException(
          "The sort order should be 'asc' or 'desc'.",
        );
      }
    });
    return true;
  }

  defaultMessage(): string {
    return "The sort field is invalid.";
  }
}
