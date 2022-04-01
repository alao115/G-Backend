import Router, { Express } from 'express'

const router = Router()

export default ({ app, ValidationManager, AuthController }: { app: Express; ValidationManager: any; AuthController: any }) => {
    app.use('/auth/', router)

    router.post('/signup', ValidationManager.validationHelper(ValidationManager.schemas().signup), AuthController.signUp)

    router.post('/signin', ValidationManager.validationHelper(ValidationManager.schemas().signin), AuthController.signIn)

    router.post('/refresh-token', ValidationManager.validationHelper(ValidationManager.schemas().refreshToken), AuthController.refresh)

    router.post('/password-reset', ValidationManager.validationHelper(ValidationManager.schemas().resetPassword), AuthController.resetPassword)

     router.post('/send-verification-email', ValidationManager.validationHelper(ValidationManager.schemas().mailVerification), AuthController.sendVerificationMail());

    router.post('/email-token-verification', ValidationManager.validationHelper(ValidationManager.schemas().emailVerification), AuthController.emailVerification);

    router.post('/send-password-recovery-email', ValidationManager.validationHelper(ValidationManager.schemas().mailVerification), AuthController.sendVerificationMail({ isPassword: true }));

    router.post('/password-recovery-token-verification', ValidationManager.validationHelper(ValidationManager.schemas().passwordRecoveryToken), AuthController.passwordRecoveryTokenVerification);
}