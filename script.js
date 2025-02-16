const month_drop_down = document.getElementById('mm');
for(let month = 1; month <=12; month++){
    let option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    month_drop_down.appendChild(option);
}
const day_drop_down = document.getElementById('dd');
for(let day = 1; day <= 31; day++){
    let option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    day_drop_down.appendChild(option);
}
const year_drop_down = document.getElementById('yy');
for(let year = 2024; year >= 1924; year--){
    let option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    year_drop_down.appendChild(option);
}

// age calculation

document.getElementById('calculate').addEventListener('click', function(event){
    event.preventDefault();
    let month = parseInt(document.getElementById('mm').value);
    let day =  parseInt(document.getElementById('dd').value);
    let year = parseInt(document.getElementById('yy').value);

    if(isNaN(month) || isNaN(day) || isNaN(year)){
        alert('Select a valid date, please!');
        return;
    }
    if((month === 1 || month ===3 || month === 5 || month === 7 || month === 8 || month === 10 || month == 12) && day > 30){
        alert('Please pay more attention to select the date selection!');
        return;
    }
    
    let today = new Date ();
    today.setHours(0, 0, 0, 0);
    let date_Of_Birth = new Date(year, month - 1, day);

    let birth_year = today.getFullYear() - date_Of_Birth.getFullYear();
    let birth_month = today.getMonth() - date_Of_Birth.getMonth();
    let birth_day = today.getDate() - date_Of_Birth.getDate();

    if(birth_day < 0){
        birth_month--;
        birth_day+= new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if(birth_month < 0 ){
        birth_year--;
        birth_month += 12;
    }
   

    document.querySelector('.age-year').textContent = `${birth_year} years, ${birth_month} months and ${birth_day} days`;

// Calculate time remaining until next birthday
    let current_year = today.getFullYear();
    let next_birthday = new Date(current_year, month - 1 , day);
    if(next_birthday < today){
        next_birthday.setFullYear(current_year + 1);
    }
    let time_difference = next_birthday - today;
    let total_remaining_days =  Math.floor(time_difference / (1000 * 60 * 60 * 24));

    let remaining_months = 0;
    let temp_date = new Date(today);
    

    while (temp_date < next_birthday) {
        temp_date.setMonth(temp_date.getMonth() + 1);
        if (temp_date <= next_birthday) {
            remaining_months++;
        }
    }
    temp_date.setMonth(temp_date.getMonth() - 1); // Go back one month to find the exact days
    let remaining_days = Math.floor((next_birthday - temp_date) / (1000 * 60 * 60 * 24));
    
    if (total_remaining_days === 0) {
        alert("Happy Birthday! 🎉");
    } else {
        document.querySelector(".remaining-time").textContent = `${remaining_months} months and ${remaining_days} days remaining until your birthday!`;
    }
});
