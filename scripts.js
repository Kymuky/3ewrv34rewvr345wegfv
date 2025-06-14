// scripts.js

// 1) Данные сотрудников и модальные функции
const staffData = [
  {
    name: "Иван Петров",
    role: "Начальник отдела кибербезопасности",
    cases: [
      "Выявил схему обналичивания через подставные банки",
      "Пресёк колл-центр с 500 SIM-картами"
    ],
    table: [
      { date: "01.05.2025", case: "Маскировка денег под кредитные переводы", result: "Погашено 74 млн ₽" },
      { date: "22.04.2025", case: "Анонимные переводы в даркнете", result: "Ликвидирован канал" }
    ]
  },
  {
    name: "Анна Сидорова",
    role: "Специалист по финансовому анализу",
    cases: [
      "Заблокировала транзит через подставной банк",
      "Отследила перевод 9 млн ₽ на поддельные счета"
    ],
    table: [
      { date: "14.04.2025", case: "Фрод в микрокредитных организациях", result: "Закрыт весь кластер" },
      { date: "02.03.2025", case: "Мошенничество через псевдо-НКО", result: "Выявлено 17 участников" }
    ]
  },
  {
    name: "Михаил Андреев",
    role: "Аналитик операций в реальном времени",
    cases: [
      "Блокировал перевод 22 млн ₽ до завершения транзакции",
      "Создал систему раннего оповещения о подозрительных звонках"
    ],
    table: [
      { date: "08.03.2025", case: "Хищение через голосовые боты", result: "Отключено 120 номеров" },
      { date: "25.02.2025", case: "Отмывание через ИП", result: "Раскрыто 5 фальшивых бизнесов" }
    ]
  },
  {
    name: "Ольга Кузнецова",
    role: "Куратор проектов антифрода",
    cases: [
      "Запустила кампанию «Стоп Звонок»",
      "Создала базу мошеннических номеров"
    ],
    table: [
      { date: "12.02.2025", case: "Колл-центр в Челябинске", result: "Обнаружено 1 200 номеров" },
      { date: "10.01.2025", case: "Инвестплатформа", result: "Возвращено 6.3 млн ₽" }
    ]
  },
  {
    name: "Роман Яковлев",
    role: "Оперативный сотрудник",
    cases: [
      "Внедрился в группу банковских мошенников",
      "Документировал 14 эпизодов перевода средств"
    ],
    table: [
      { date: "03.03.2025", case: "Курьерские схемы", result: "9 задержаний" },
      { date: "15.02.2025", case: "Колл-центр в Самаре", result: "3 ареста" }
    ]
  },
  {
    name: "Елена Морозова",
    role: "Эксперт по выявлению мошеннических схем",
    cases: [
      "Схема перевода на криптовалюту",
      "Идентифицировала связь между 27 номерами"
    ],
    table: [
      { date: "01.03.2025", case: "Телефонные разводы", result: "18 поддельных удостоверений" },
      { date: "12.02.2025", case: "Финансовые пирамиды", result: "Инициировано расследование ЦБ" }
    ]
  },
  {
    name: "Алексей Громов",
    role: "Специалист по цифровым следам",
    cases: [
      "Вычислил местоположение фейкового банка по IP",
      "ML-анализ транзакций"
    ],
    table: [
      { date: "20.03.2025", case: "Сайт-клон банка", result: "Удалён, виновные найдены" },
      { date: "05.03.2025", case: "QR-переводы", result: "Собрано досье на 12 человек" }
    ]
  },
  {
    name: "Наталья Фролова",
    role: "Заместитель руководителя службы",
    cases: [
      "Курировала крупные дела 2025 года",
      "Утвердила стратегию блокировки eSIM"
    ],
    table: [
      { date: "01.04.2025", case: "Офшорные переводы", result: "Средства возвращены" },
      { date: "10.03.2025", case: "Преступная группа в Telegram", result: "Изъято 2.5 млн ₽" }
    ]
  }
];

function openModal(i) {
  const d = staffData[i];
  document.getElementById("modal-name").textContent = d.name;
  document.getElementById("modal-role").textContent = d.role;
  const ul = document.getElementById("modal-cases");
  ul.innerHTML = "";
  d.cases.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    ul.appendChild(li);
  });
  const tb = document.querySelector("#modal-table tbody");
  tb.innerHTML = "";
  d.table.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.date}</td><td>${r.case}</td><td>${r.result}</td>`;
    tb.appendChild(tr);
  });
  document.getElementById("modal").style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// 2) Проверка телефона
const blacklisted = ["+79001234567","+79115552222","89003003030"];
function checkPhone() {
  const v = "+" + document.getElementById("checkNumber").value.replace(/\D/g,"");
  const r = document.getElementById("checkResult");
  if(blacklisted.includes(v)) {
    r.textContent = "⚠️ Этот номер известен как мошеннический.";
    r.style.color = "red";
  } else {
    r.textContent = "✅ Номер не найден в базе.";
    r.style.color = "green";
  }
}

// 3) Поиск в чёрном списке
function searchBlacklist() {
  const v = "+" + document.getElementById("bl-input").value.replace(/\D/g,"");
  const r = document.getElementById("bl-result");
  if(blacklisted.includes(v)) {
    r.textContent = "⚠️ "+v+" — внесён в чёрный список.";
    r.style.color = "red";
  } else {
    r.textContent = "✅ "+v+" — не найден.";
    r.style.color = "green";
  }
}

// 4) Галерея
function openFull(img) {
  const m = document.getElementById("fullImageModal");
  const f = document.getElementById("fullImage");
  f.src = img.src;
  m.style.display = "flex";
}
