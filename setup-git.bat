@echo off
echo 正在初始化Git仓库...
git init

echo 添加所有文件到Git...
git add .

echo 创建初始提交...
git commit -m "Initial commit: Investment Calculator - React app based on pr.md"

echo.
echo Git仓库已初始化完成！
echo.
echo 接下来的步骤：
echo 1. 在GitHub上创建新仓库（建议命名为：investment-calculator）
echo 2. 复制GitHub提供的远程仓库地址
echo 3. 运行以下命令连接到GitHub：
echo    git remote add origin [您的GitHub仓库地址]
echo    git branch -M main
echo    git push -u origin main
echo.
echo 部署完成后，您的网站将在以下地址可访问：
echo https://[您的GitHub用户名].github.io/investment-calculator/
echo.
pause
