document.addEventListener('DOMContentLoaded', async () => {
    const authButtons = document.querySelector('.auth-buttons');
    if (!authButtons) return;

    try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();

        if (data.success && data.user) {
            // User is logged in
            authButtons.innerHTML = `
                <span class="nav-link" style="margin-right: 10px;">${data.user.nickname}님</span>
                <a href="#" class="nav-btn btn-login" id="btn-logout">로그아웃</a>
            `;

            document.getElementById('btn-logout').addEventListener('click', async (e) => {
                e.preventDefault();
                await fetch('/api/auth/logout', { method: 'POST' });
                window.location.reload();
            });
        }
    } catch (error) {
        console.error('Failed to check auth status:', error);
    }
});
