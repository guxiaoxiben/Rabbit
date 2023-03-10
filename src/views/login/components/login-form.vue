<script lang="ts" setup name="LoginForm">
import Message from "@/components/message"
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import userStore from "@/store"
import { useField, useForm } from "vee-validate"
import { useIntervalFn } from "@vueuse/core"
import { useCountDown } from "@/utils/hooks"
import {
  accountRule,
  mobileRule,
  codeRule,
  passwordRule,
  isAgreeRule,
} from "@/utils/validate"

const type = ref<"account" | "mobile">("account")
const { user } = userStore()
const router = useRouter()

/**
 * 表单数据
 */
const form = ref({
  account: "",
  password: "",
  isAgree: false,
})

// 添加效验
const { validate, resetForm } = useForm({
  // 设置初始值
  initialValues: {
    mobile: "13666666666",
    code: "123456",
    account: "xiaotuxian001",
    password: "123456",
    isAgree: true,
  },
  // 设置校验
  validationSchema: {
    account: accountRule,
    mobile: mobileRule,
    code: codeRule,
    password: passwordRule,
    isAgree: isAgreeRule,
  },
})
const { value: account, errorMessage: accountError } =
  useField<string>("account")
const { value: password, errorMessage: passwordError } =
  useField<string>("password")
const { value: isAgree, errorMessage: isAgreeError } =
  useField<boolean>("isAgree")
const {
  value: mobile,
  errorMessage: mobileError,
  validate: validateMobile,
} = useField<string>("mobile")
const { value: code, errorMessage: codeError } = useField<string>("code")

// 监听type的变化 处理切换重置
watch(type, () => {
  // 重置表单
  resetForm()
})
const mobileRef = ref<HTMLInputElement | null>(null)
const { time, start } = useCountDown(60)
/**
 * 发送验证码
 */
const send = async () => {
  if (time.value > 0) return
  const res = await validateMobile()
  if (!res.valid) {
    // 校验没通过
    mobileRef.value?.focus()
    return
  }
  // console.log("发送验证码")
  try {
    await user.sendMobileMsg(mobile.value)
    Message.success("获取验证码成功")
    start()
  } catch {
    Message.error("获取验证码失败")
  }
}
/**
 *登录
 */
const login = async () => {
  // 效验整个表单信息
  const res = await validate()
  if (!res.valid) return
  if (type.value === "account") {
    if (res.errors.account || res.errors.password || res.errors.isAgree) return
    await user.login(account.value, password.value)
  } else {
    if (res.errors.mobile || res.errors.code || res.errors.isAgree) return
    await user.mobileLogin(mobile.value, code.value)
    Message.success("登录成功")
  }
  // 跳转到首页
  router.push("/")
}
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" @click="type = 'account'" v-if="type === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" @click="type = 'mobile'" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="type === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              type="text"
              v-model="account"
              placeholder="请输入用户名或手机号"
            />
          </div>
          <div class="error" v-if="accountError">
            <i class="iconfont icon-warning" />{{ accountError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input
              type="password"
              v-model="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="passwordError">
            <i class="iconfont icon-warning" />{{ passwordError }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              ref="mobileRef"
              type="text"
              v-model="mobile"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="mobileError">
            <i class="iconfont icon-warning" />{{ mobileError }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input type="password" v-model="code" placeholder="请输入验证码" />
            <span class="code" @click="send">{{
              time === 0 ? "发送验证码" : `${time}s后发送`
            }}</span>
          </div>
          <div class="error" v-if="codeError">
            <i class="iconfont icon-warning" />{{ codeError }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- 复选框 -->
          <XtxCheckbox v-model="isAgree">
            <span>我已同意</span>
          </XtxCheckbox>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeError">
          <i class="iconfont icon-warning" />{{ isAgreeError }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login()">登录</a>
    </div>
    <div class="action">
      <!-- QQ登录 -->
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt="QQ登录"
          border="0"
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
