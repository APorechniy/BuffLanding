export const generateTrialEmail = (subscriptionUrl: string) => {
  return `
<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ваш доступ к Buff VPN</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #090D16;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #090D16;
      padding-bottom: 40px;
    }
    .main {
      background-color: #0f172a;
      margin: 0 auto;
      width: 100%;
      max-width: 580px;
      border-spacing: 0;
      color: #f8fafc;
      border-radius: 16px;
      border: 1px solid rgba(56, 189, 248, 0.22);
      overflow: hidden;
    }
    .button {
      background-color: #38bdf8;
      color: #04101e !important;
      text-decoration: none;
      padding: 14px 28px;
      font-weight: 700;
      border-radius: 10px;
      display: inline-block;
      font-size: 15px;
    }
    .code-box {
      background-color: #090D16;
      border: 1px dashed rgba(56, 189, 248, 0.3);
      padding: 12px 16px;
      border-radius: 8px;
      color: #94a3b8;
      font-family: Monaco, Consolas, monospace;
      font-size: 12px;
      word-break: break-all;
      margin-top: 10px;
    }
  </style>
</head>
<body style="background-color: #090D16; margin: 0; padding: 0;">
  <center class="wrapper" style="width: 100%; background-color: #090D16; padding-top: 40px; padding-bottom: 40px;">
    
    <!-- Header/Logo -->
    <table width="100%" style="max-width: 580px; margin-bottom: 24px;">
      <tr>
        <td style="text-align: center;">
          <span style="font-size: 24px; font-weight: 800; color: #f8fafc; letter-spacing: -0.5px;">
            ⚡ Buff <span style="color: #38bdf8;">VPN</span>
          </span>
        </td>
      </tr>
    </table>

    <!-- Main Card -->
    <table class="main" width="100%" style="max-width: 580px; background-color: #0f172a; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.22);">
      <tr>
        <td style="padding: 40px 32px; text-align: center;">
          
          <h1 style="font-size: 22px; font-weight: 800; margin: 0 0 16px 0; color: #f8fafc;">
            Спасибо, что выбрали Buff VPN! 🚀
          </h1>
          
          <p style="font-size: 15px; line-height: 1.6; color: #94a3b8; margin: 0 0 28px 0;">
            Ваш бесплатный пробный период успешно активирован. Перейдите по кнопке ниже для импорта подписки в ваше приложение:
          </p>

          <!-- Main CTA Button -->
          <table align="center" style="margin: 0 auto 32px auto;">
            <tr>
              <td align="center" style="border-radius: 10px; background-color: #38bdf8;">
                <a href="${subscriptionUrl}" target="_blank" class="button" style="background-color: #38bdf8; color: #04101e; text-decoration: none; padding: 14px 28px; font-weight: 700; border-radius: 10px; display: inline-block; font-size: 15px;">
                  Подключить в 1 клик
                </a>
              </td>
            </tr>
          </table>

          <!-- Raw URL Box (fallback) -->
          <p style="font-size: 13px; color: #64748b; margin: 0; text-align: left;">
            Либо скопируйте прямую ссылку и вставьте её вручную:
          </p>
          <div class="code-box" style="background-color: #090D16; border: 1px dashed rgba(56, 189, 248, 0.3); padding: 12px 16px; border-radius: 8px; color: #94a3b8; font-family: Monaco, Consolas, monospace; font-size: 12px; word-break: break-all; margin-top: 8px; text-align: left;">
            ${subscriptionUrl}
          </div>

        </td>
      </tr>
    </table>

    <!-- Footer -->
    <table width="100%" style="max-width: 580px; margin-top: 24px;">
      <tr>
        <td style="text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 6px 0;">© 2026 Buff VPN. Безопасность и свобода информации.</p>
          <p style="margin: 0;">Если вы не запрашивали доступ, просто проигнорируйте это письмо.</p>
        </td>
      </tr>
    </table>

  </center>
</body>
</html>
  `;
};

export const generateTariffEmail = (subscriptionUrl: string, tariffName: string, amount: number) => {
  return `
<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Оплата прошла успешно! Ваш доступ к Buff VPN</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #090D16;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-spacing: 0;
    }
    td {
      padding: 0;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #090D16;
      padding-bottom: 40px;
    }
    .main {
      background-color: #0f172a;
      margin: 0 auto;
      width: 100%;
      max-width: 580px;
      border-spacing: 0;
      color: #f8fafc;
      border-radius: 16px;
      border: 1px solid rgba(56, 189, 248, 0.22);
      overflow: hidden;
    }
    .button {
      background-color: #38bdf8;
      color: #04101e !important;
      text-decoration: none;
      padding: 14px 28px;
      font-weight: 700;
      border-radius: 10px;
      display: inline-block;
      font-size: 15px;
    }
    .code-box {
      background-color: #090D16;
      border: 1px dashed rgba(56, 189, 248, 0.3);
      padding: 12px 16px;
      border-radius: 8px;
      color: #94a3b8;
      font-family: Monaco, Consolas, monospace;
      font-size: 12px;
      word-break: break-all;
      margin-top: 10px;
    }
    .badge {
      background-color: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #10B981;
      font-size: 13px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      display: inline-block;
      margin-bottom: 18px;
    }
    .order-box {
      background-color: #090D16;
      border: 1px solid rgba(56, 189, 248, 0.14);
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 24px;
      text-align: left;
    }
  </style>
</head>
<body style="background-color: #090D16; margin: 0; padding: 0;">
  <center class="wrapper" style="width: 100%; background-color: #090D16; padding-top: 40px; padding-bottom: 40px;">
    
    <!-- Header/Logo -->
    <table width="100%" style="max-width: 580px; margin-bottom: 24px;">
      <tr>
        <td style="text-align: center;">
          <span style="font-size: 24px; font-weight: 800; color: #f8fafc; letter-spacing: -0.5px;">
            ⚡ Buff <span style="color: #38bdf8;">VPN</span>
          </span>
        </td>
      </tr>
    </table>

    <!-- Main Card -->
    <table class="main" width="100%" style="max-width: 580px; background-color: #0f172a; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.22);">
      <tr>
        <td style="padding: 40px 32px; text-align: center;">
          
          <!-- Success Badge -->
          <div class="badge" style="background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10B981; font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 999px; display: inline-block; margin-bottom: 18px;">
            ✔ Оплата успешно завершена
          </div>

          <h1 style="font-size: 23px; font-weight: 800; margin: 0 0 14px 0; color: #f8fafc;">
            Спасибо за покупку! 🎉
          </h1>
          
          <p style="font-size: 15px; line-height: 1.6; color: #94a3b8; margin: 0 0 24px 0;">
            Ваша подписка успешно активирована. Ваш интернет теперь под надежной защитой без блокировок и потери скорости.
          </p>

          <!-- Order Summary Details -->
          <table width="100%" class="order-box" style="background-color: #090D16; border: 1px solid rgba(56, 189, 248, 0.14); border-radius: 12px; padding: 14px 18px; margin-bottom: 26px; text-align: left;">
            <tr>
              <td style="font-size: 14px; color: #94a3b8; padding-bottom: 6px;">Тарифный план:</td>
              <td style="font-size: 14px; color: #f8fafc; font-weight: 700; text-align: right; padding-bottom: 6px;">
                ${tariffName}
              </td>
            </tr>
            ${amount
      ? `
            <tr>
              <td style="font-size: 14px; color: #94a3b8;">Сумма оплаты:</td>
              <td style="font-size: 14px; color: #38bdf8; font-weight: 800; text-align: right;">
                ${amount} ₽
              </td>
            </tr>
            `
      : ''
    }
          </table>

          <!-- Main CTA Button -->
          <table align="center" style="margin: 0 auto 30px auto;">
            <tr>
              <td align="center" style="border-radius: 10px; background-color: #38bdf8;">
                <a href="${subscriptionUrl}" target="_blank" class="button" style="background-color: #38bdf8; color: #04101e; text-decoration: none; padding: 14px 28px; font-weight: 700; border-radius: 10px; display: inline-block; font-size: 15px;">
                  Подключить в 1 клик
                </a>
              </td>
            </tr>
          </table>

          <!-- Fallback URL -->
          <p style="font-size: 13px; color: #64748b; margin: 0; text-align: left;">
            Если кнопка не срабатывает, скопируйте ссылку вручную:
          </p>
          <div class="code-box" style="background-color: #090D16; border: 1px dashed rgba(56, 189, 248, 0.3); padding: 12px 16px; border-radius: 8px; color: #94a3b8; font-family: Monaco, Consolas, monospace; font-size: 12px; word-break: break-all; margin-top: 8px; text-align: left;">
            ${subscriptionUrl}
          </div>

        </td>
      </tr>
    </table>

    <!-- Footer -->
    <table width="100%" style="max-width: 580px; margin-top: 24px;">
      <tr>
        <td style="text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0 0 6px 0;">© 2026 Buff VPN. Безопасность и свобода информации.</p>
          <p style="margin: 0;">Нужна помощь? Напишите в нашу службу поддержки в Telegram.</p>
        </td>
      </tr>
    </table>

  </center>
</body>
</html>
  `;
};