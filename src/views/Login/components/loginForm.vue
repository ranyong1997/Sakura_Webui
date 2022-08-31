<template>
  <div class="form-container">
    <!-- 登录 -->
    <el-form v-if="showLogin" ref="loginFormRef" :model="loginForm" status-icon :hide-required-asterisk="true"
      :rules="rules" label-width="100px" class="login-form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入登录账号(root)"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" autocomplete="off" placeholder="请输入密码(123456)">
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-container">
          <el-button type="primary" style="width: 100%" @click="submitForm()">登录</el-button>
        </div>
        <div class="operation">
          <span class="free-register" @click="showLogin = !showLogin">免费注册</span>
          <span class="forget-password" @click="handleForget">忘记密码</span>
        </div>
      </el-form-item>
    </el-form>
    <!-- 注册 -->
    <el-form v-if="!showLogin" ref="registerRef" :model="registerForm" status-icon :hide-required-asterisk="true"
      :rules="rules" label-width="100px" class="login-form">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerForm.name" maxlength="10" autocomplete="off" placeholder="请输入您的姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="registerForm.username" maxlength="10" autocomplete="off" placeholder="请输入您的登录账号">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password" type="password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="registerForm.checkPass" type="password" autocomplete="off" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email" autocomplete="off" placeholder="请输入邮箱">
          <!-- <template #append>
            <el-button :disabled="sendingCode" @click="handleGetCaptcha">{{ codeText }}</el-button>
          </template> -->
        </el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn-container">
          <el-button type="primary" style="width: 100%" @click="handleRegister()">完成注册</el-button>
        </div>
        <div class="go-login">
          <span class="to-login" @click="showLogin = !showLogin">已有账号<em>去登陆</em></span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'
import Service from '../api/index'

interface stateType {
  loginForm: {
    username: string
    password: string
  }
  registerForm: {
    name: string
    username: string
    password: string
    checkPass: string
    email: string
  }
  showLogin: boolean
}

// eslint-disable-next-line no-unused-vars
type VoidNoop = (arg0?: Error) => void
export default defineComponent({
  name: 'LoginForm',
  emits: ['toResetPwd'],
  setup(_props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const loginFormRef = ref()
    const registerRef = ref()
    const store = useStore()
    const sendingCode = ref(false)
    const codeText = ref('获取验证码')
    const state = reactive<stateType>({
      loginForm: {
        username: 'root',
        password: '123456'
      },
      registerForm: {
        name: '',
        username: '',
        password: '',
        checkPass: '',
        email: ''
      },
      showLogin: true
    })

    // eslint-disable-next-line no-unused-vars
    const validatePass2 = (rule: any, value: string, callback: VoidNoop) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule: any, value: string, callback: VoidNoop) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (state.registerForm.checkPass !== '') {
          registerRef.value.validateField('checkPass')
        }
        callback()
      }
    }
    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, message: '长度至少3个字符', trigger: 'blur' }
      ],
      password: [
        { validator: validatePass, trigger: 'blur' },
        { min: 6, message: '长度至少6个字符', trigger: 'blur' }
      ],
      checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      email: [
        { required: true, message: '请输入注册账号', trigger: 'change' },
        { type: 'username', message: '请输入正确的账号', trigger: ['blur', 'change'] }
      ],
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
      ],
    }

    // methods

    /**
     * @description  用户登录接口
     *
     */
    const submitForm = () => {
      loginFormRef.value.validate(async (valid: any) => {
        if (valid) {
          try {
            const { username, password } = state.loginForm
            const data = {
              username,
              password
            }
            const res = await Service.postLogin(data)
            localStorage.setItem('token', res)
            console.log("res------>", res)
            const userInfo = await Service.postAuthUserInfo()
            console.log("userInfo------>", userInfo)
            const accessToken = res;
            console.log("accessToken------>", accessToken)
            if (accessToken) {
              // 将角色存储到全局vuex roles
              if (userInfo.code === 0) {
                store.dispatch('permissionModule/getPermissonRoles', userInfo.data)
              }
              // 先进行异步路由处理
              store.dispatch('permissionModule/getPermissonRoutes', userInfo.data)
              store.dispatch('permissionModule/getPermissions')
              sessionStorage.setItem('auth', 'true')
              sessionStorage.setItem('accessToken', accessToken)
              if (route.query.redirect) {
                const path = route.query.redirect
                router.push({ path: path as string })
              } else {
                router.push('/')
              }
            } else {
              ElMessage({
                type: 'warning',
                message: '账号或者密码有误'
              })
            }
          } catch (err) {
            ElMessage({
              type: 'warning',
              message: err.message
            })
          }
        }
        return false
      })
    }
    /**
     * @description 处理注册接口
     */
    const handleRegister = () => {
      registerRef.value.validate(async (valid: any) => {
        if (valid) {
          try {
            const { name, email, password, username } = state.registerForm
            const data = {
              name,
              email,
              username,
              password
            }
            Service.postRegister(data)
              .then((res: any) => {
                if (res.status === 0) {
                  ElMessage({
                    type: 'success',
                    message: '注册成功'
                  })
                  state.showLogin = true
                } else {
                  ElMessage({
                    type: 'warning',
                    message: res.message
                  })
                }
              })
              .catch((err) => {
                ElMessage({
                  type: 'warning',
                  message: err.message
                })
              })
          } catch (err) {
            ElMessage({
              type: 'error',
              message: err.message
            })
          }
        }
      })
    }
    /**
     * @description 获取验证码状态
     */
    const getCodeSucces = () => {
      let countDown = 60
      sendingCode.value = true
      const interval = setInterval(() => {
        if (countDown > 0) {
          codeText.value = `已发送(${countDown}s)`
          countDown -= 1
        } else {
          clearInterval(interval)
          sendingCode.value = false
          codeText.value = '获取验证码'
        }
      }, 1000)
    }
    /**
     * @description 获取验证码
     */
    // const handleGetCaptcha = async (): Promise<boolean> => {
    //   try {
    //     const { email } = state.registerForm
    //     if (!email) {
    //       ElMessage({
    //         type: 'warning',
    //         message: '请输入注册邮箱'
    //       })
    //       return false
    //     }
    //     const data = {
    //       email
    //     }
    //     const res = await Service.postCaptcha(data)
    //     if (res.status === 0) {
    //       ElMessage({
    //         type: 'success',
    //         message: res.message
    //       })
    //       getCodeSucces()
    //       return true
    //     }
    //     ElMessage({
    //       type: 'warning',
    //       message: res.message
    //     })
    //     return false
    //   } catch (err) {
    //     console.error(err)
    //     return false
    //   }
    // }
    /**
     * @description 忘记密码
     */
    const handleForget = () => {
      emit('toResetPwd')
    }
    return {
      ...toRefs(state),
      loginFormRef,
      registerRef,
      sendingCode,
      codeText,
      rules,
      submitForm,
      handleRegister,
      // handleGetCaptcha,
      handleForget
    }
  }
})
</script>
<style lang="stylus" scoped>
.form-container{
  width:100%;

  :deep(.el-input-group__append) {
    padding:0px 7px;
  }

  :deep(.el-input-group__prepend) {
    padding:0px 7px;
  }

  .login-form{
    width:100%;
    margin: 0 auto;
  }
  .go-login{
    font-size: 12px;
    cursor: pointer;
    display:flex;
    flex-direction:row ;
    justify-content: center;
    align-items :center;

    .to-login{
      color: #9fa2a8;

      em{
        color: #2878ff;
      }
    }
  }

  .operation{
    font-size: 12px;
    cursor: pointer;
    display:flex;
    flex-direction:row ;
    justify-content: space-between;
    align-items :center;

    .free-register{
        color: #2878ff;
      }

      .forget-password{
        color: #9fa2a8;
      }
    }
    .btn-container{
        width:100%;
        display :flex;
        flex-direction:row;
        justify-content :flex-start;
        align-items :center;
    }
  }
</style>
