(function () {
    'use strict';

    // --- モバイルナビ開閉 ---
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('siteNav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        // ナビ内リンクをタップしたら閉じる
        nav.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- お問い合わせフォーム ---
    // Googleフォームへ hidden iframe 経由で POST する。
    // クロスオリジンのため送信結果は取得できず、成功表示は楽観的に行う。
    var form = document.getElementById('contactForm');
    if (form) {
        var success = document.getElementById('formSuccess');
        var button = document.getElementById('sendButton');

        function validateField(input) {
            var field = input.closest('.form-field');
            var ok = input.checkValidity();
            field.classList.toggle('invalid', !ok);
            return ok;
        }

        form.addEventListener('submit', function (e) {
            var allValid = true;
            form.querySelectorAll('input, textarea').forEach(function (input) {
                if (!validateField(input)) allValid = false;
            });
            if (!allValid) {
                e.preventDefault();
                var firstInvalid = form.querySelector('.form-field.invalid input, .form-field.invalid textarea');
                if (firstInvalid) firstInvalid.focus();
                return;
            }
            // 送信自体はブラウザに任せ、UI だけ更新する
            button.disabled = true;
            button.textContent = '送信しました';
            success.classList.add('shown');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        form.querySelectorAll('input, textarea').forEach(function (input) {
            input.addEventListener('blur', function () { validateField(input); });
        });
    }

    // --- 実績のカテゴリフィルタ ---
    // カテゴリはカード内の .case-tag の文言から判定する
    var caseFilter = document.querySelector('.case-filter');
    if (caseFilter) {
        caseFilter.addEventListener('click', function (e) {
            var btn = e.target.closest('button');
            if (!btn) return;
            caseFilter.querySelectorAll('button').forEach(function (b) {
                b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
            });
            var category = btn.dataset.filter;
            document.querySelectorAll('.cases .case').forEach(function (card) {
                var tag = card.querySelector('.case-tag');
                card.hidden = category !== 'all' && (!tag || tag.textContent.trim() !== category);
            });
        });
    }

    // --- 実績モーダル ---
    document.querySelectorAll('.case-open').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var dialog = document.getElementById(btn.dataset.dialog);
            if (dialog) dialog.showModal();
        });
    });

    document.querySelectorAll('.case-dialog').forEach(function (dialog) {
        dialog.querySelector('.dialog-close').addEventListener('click', function () {
            dialog.close();
        });
        // 背景（dialog自身）クリックで閉じる
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) dialog.close();
        });
    });

    // --- コピーライト年 ---
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // --- 旧サイトの Service Worker とキャッシュを掃除する ---
    // 旧サイトはキャッシュファーストの SW を登録していたため、
    // これを外さないと再訪問者に古いページが表示され続ける。
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function (regs) {
            regs.forEach(function (reg) { reg.unregister(); });
        });
        if (window.caches && caches.keys) {
            caches.keys().then(function (keys) {
                keys.forEach(function (key) { caches.delete(key); });
            });
        }
    }
})();
