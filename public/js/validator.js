$(function () {
  window.Validator = function (val, rule) { // val用户输入值 rule 规则
    this.validate_minlength = function () {
      val = val.toString();
      return val.length <= rule.minlength;
    }

  }
});