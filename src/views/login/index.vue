<template>
  <div id="warp" class="logo-page">
    <div class="page-sign">
      <!-- <video :style="fixStyle" class="fillWidth" muted="muted" x5-video-player-fullscreen="false"
                  autoplay="autoplay" loop="loop" @canplaythrough="hideImage">
                  <source src="https://imgcdn.guochuanyoupin.com/resource/pc/video/1.mp4" type="video/mp4" />
                  浏览器不支持 video 标签，建议升级浏览器。
                  <source src="https://imgcdn.guochuanyoupin.com/resource/pc/video/1.mp4" type="video/webm" />
                  浏览器不支持 video 标签，建议升级浏览器。
              </video> -->
      <div class="login-box">
        <!-- <div class="box-left-content"></div> -->
        <div class="box-right-content">
          <!-- 手机号登陆（输入区域） -->
          <div class="box-phone-wrapper">
            <h3 class="login-title">用户名/密码登录</h3>
            <span class="login-desc"
              >欢迎来到 {{ VITE_APP_TITLE }} 管理系统 ! 👋🏻</span
            >
            <div class="login-form-wrapper">
              <div class="form-row">
                <div class="form-row-input-wrapper">
                  <span class="input-wrapper">
                    <input
                      required
                      type="text"
                      :value="loginForm.username"
                      maxlength="11"
                      @input="updataModelValue($event, 'username')"
                      @keyup.enter="handleLogin"
                    />
                    <span>请输入用户名</span>
                  </span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-row-input-wrapper">
                  <span class="input-wrapper">
                    <input
                      required
                      type="password"
                      :value="loginForm.password"
                      @input="updataModelValue($event, 'password')"
                      @keyup.enter="handleLogin"
                    />
                    <span>请输入密码</span>
                  </span>
                </div>
              </div>
              <div class="form-btn">
                <el-button
                  class="btn-login"
                  type="primary"
                  :loading="loading"
                  @click="handleLogin"
                >
                  登录
                </el-button>
              </div>
            </div>
            <div class="login-protocol-wrapper row between">
              <span class="row" @click="checkProtocol">
                <span
                  class="checked-wrapper"
                  :class="protocolChecked ? 'is-checked' : ''"
                >
                  <input type="checkbox" class="checked-input" />
                  <i class="checked-icon"></i>
                </span>
                <i class="protocol-text" style="color: #999">记住我</i>
              </span>
              <span class="protocol-text">忘记密码</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useSettingsStore } from "@/store/modules/settings";
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const router = useRouter(); // 路由跳转
const route = useRoute(); // 当前路由
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { proxy } = getCurrentInstance() as any;
const loading = ref<boolean>(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const redirect = ref<any>("");
const protocolChecked = ref<boolean>(false); // 协议勾选
const loginForm = ref({
  // 表单数据
  username: "admin",
  password: "123456",
  v: "",
});
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE;
// 方法 -------------------------------------- // mathods
const checkProtocol = () => {
  protocolChecked.value = !protocolChecked.value;
};

// input输入框更新
const updataModelValue = (e: Event, type: string) => {
  const event = e || (window.event as Event);
  const target = event.target as HTMLInputElement;
  if (type == "username") {
    loginForm.value.username = target.value;
  } else if (type == "password") {
    loginForm.value.password = target.value;
  }
};

// 登录
const handleLogin = async () => {
  // 解构
  const { username, password } = loginForm.value;
  if (!username) return proxy?.$message("warning", "请输入用户名");
  if (!password) return proxy?.$message("warning", "请输入密码");
  loading.value = true;
  try {
    await userStore.login(loginForm.value);
    // proxy?.$message("success", "登录成功");
    router.push({ path: redirect.value || "/" });
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

// 监听器
watch(
  route,
  () => {
    redirect.value = route.query && route.query.redirect;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.logo-page {
  height: 100%;
  background-color: rgba(99, 102, 241, 0.5);
  // background-color: rgba(var(--el-color-primary), 0.5);

  .page-sign {
    min-height: 100%;
    // #00c1c1
    // background: #F42F2F url(https://img.bosszhipin.com/static/file/2022/zlqc2m9fao1667185843533.png) bottom / 100% auto no-repeat;
    // background:url('../../images/login/youpin-loginBack.png');
    // background-repeat: no-repeat;
    // background-size: cover;
  }

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    // width: 728px;
    // height: 580px;
    background: #fff;
    box-shadow: 0 6px 13px 0 rgba(0, 0, 0, 0.1);
    border-radius: 28px;
    z-index: 2;
    box-sizing: border-box;

    .box-left-content {
      float: left;
      width: 240px;
      height: 100%;
      background: linear-gradient(214deg, #dffbff, #faf6f3);
      //   background: $youpin-baseBgcolor;
      border-radius: 28px 0 0 28px;
      padding-left: 32px;
      //   font-size: $youpin-size14;
      box-sizing: border-box;
    }

    .box-right-content {
      float: left;
      position: relative;
      // width: 488px;
      width: 438px;
      padding: 48px 0;

      .box-phone-wrapper {
        position: relative;
        width: 360px;
        margin: 0 auto;

        .login-title {
          font-size: 22px;
          text-align: center;
        }

        .login-desc {
          display: block;
          color: #999;
          line-height: 17px;
          text-align: center;
          margin-top: 8px;
          margin-bottom: 30px;
          font-size: 12px;
        }

        .login-form-wrapper {
          .form-row {
            position: relative;

            .form-row-input-wrapper {
              height: 46px;
              position: relative;
              border: 1px solid #d0d2d9;
              border-radius: 6px;
              box-sizing: border-box;
              transition: all 0.2s linear;

              // &:hover {
              //   border-color: #fe0201;
              // }

              .input-wrapper {
                position: relative;
                display: block;

                input {
                  border: none;
                  outline: none;
                  display: block;
                  width: 100%;
                  font-size: 16px;
                  line-height: calc(46px - 2px);
                  height: calc(46px - 2px);
                  padding-right: 20px;
                  padding-left: 20px;
                  box-sizing: border-box;
                  border-radius: 6px;
                  background: none;
                  // padding: 10px 15px;
                  color: #333;
                  font-size: 16px;
                  font-weight: 550;
                  transition: 0.3s ease-in-out;
                  box-shadow: 0 0 0 5px transparent;

                  &:focus,
                  &:hover {
                    box-shadow: 0 0 0 2px var(--el-color-primary);
                  }
                }

                span {
                  position: absolute;
                  left: 0;
                  top: 0;
                  padding: 0px 20px;
                  line-height: calc(46px - 2px);
                  height: calc(46px - 2px);
                  color: #333;
                  font-size: 16px;
                  font-weight: 600;
                  transition: 0.3s ease-in-out;
                  pointer-events: none;
                }

                .code-btn {
                  position: absolute;
                  cursor: pointer;
                  right: 0;
                  top: 0;
                  padding: 0 20px;
                  letter-spacing: 1px;
                  font-size: 16px;
                  color: #fe0201;
                  line-height: calc(46px - 2px);
                  height: calc(46px - 2px);
                }

                .sending {
                  color: #999;
                  white-space: nowrap;
                  font-size: 14px;
                  letter-spacing: 0;
                  cursor: default;
                }
              }

              .input-wrapper input:focus + span,
              .input-wrapper input:valid + span {
                transform: translateY(-36px) translateX(-5px) scale(0.95);
                transition: 0.3s ease-in-out;
              }
            }
          }

          .form-row + .form-row {
            margin-top: 28px;
          }

          .form-btn {
            margin-top: 30px;

            .btn-login {
              width: 100%;
              height: 48px;
              border-radius: 8px;
              font-size: 16px;
              color: #fff;
              border: none;
              outline: none;
              cursor: pointer;
              transition: all 0.2s linear;
            }
          }
        }

        .login-protocol-wrapper {
          margin-top: 16px;
          font-size: 12px;
          line-height: 17px;
          padding: 10px;
          //   text-align: center;

          .checked-wrapper {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            width: 14px;
            height: 14px;
            cursor: pointer;
            margin-right: 5px;
            // top: -1px;
            border-radius: 2px;
            border: 1px solid #848899;
            transition: all 0.2s linear;
            box-sizing: border-box;

            input {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 2;
              cursor: pointer;
              outline: 0;
              /* 去除默认样式 */
              -webkit-appearance: none;
            }

            .checked-icon {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 1;
              transition: all 0.2s ease-in-out;
              transform: scale(0);
              font-style: italic !important;
            }

            .checked-icon::after {
              content: "";
              position: absolute;
              left: 3px;
              top: -1px;
              display: none;
              transform: rotate(45deg);
              width: 7px;
              height: 10px;
              border: 2px solid #fff;
              border-top: 0;
              border-left: 0;
              padding: 0 1px;
              box-sizing: border-box;
            }
          }

          .checked-wrapper:hover {
            border-color: var(--el-color-primary);
          }

          .is-checked {
            border-color: var(--el-color-primary) !important;

            .checked-icon {
              background: var(--el-color-primary);
              opacity: 1;
              transition: all 0.2s ease-in-out;
              transform: scale(1);
            }

            .checked-icon::after {
              display: table;
            }
          }

          .protocol-link {
            color: var(--el-color-primary);
            transition: all 0.2s linear;
            text-decoration: none;
          }

          .protocol-text {
            font-size: 14px;
            font-weight: 500;
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }
      }

      .box-publicity-info {
        margin-top: 14px;

        p {
          font-size: 12px;
          text-align: center;
          margin: 0;
          color: #8d92a1;
          line-height: 20px;
        }

        .info-list {
          .info-iten-link {
            color: #8d92a1;
            text-decoration: none;
            display: inline-block;
            position: relative;
            padding: 0 4px;
            line-height: 20px;
          }

          .businesslicense::before {
            position: absolute;
            content: "";
            width: 1px;
            top: 5px;
            left: -1px;
            height: 10px;
            background-color: #8d92a1;
          }
        }
      }
    }
  }
}
</style>
