var DOMStrings = {
    loadingGif: document.getElementById('loading-gif'),
    saveButton: document.querySelector('.button-primary'),
    form: document.getElementById('inputs'),
    task: document.getElementById('the-task'),
    description: document.getElementById('the-description'),
    trash: document.querySelector('.fas')
};

var id = 1;

DOMStrings.loadingGif.style.display = 'none';


var removeElement = (parent) => {
    const element = document.getElementById(parent.id);
    const tl = new TimelineMax();

    tl.fromTo(element, 0.5, { x : '25%' }, {x : '90%' })
    .fromTo(element, 0.5, { opacity: '1'}, { opacity: '0'}, '-=0.5');
    setTimeout(() => {
        element.remove();
    }, 300);
}

var addTask = (task, description) => {
    var html, finalHtml;

    html = "<div class = 'listing-task' id = '%id%'><h4>%task%</h4><p>%description%</p><i class='fas fa-trash fa-lg' onclick = 'removeElement(this.parentElement)'></i></div>";
    finalHtml = html.replace('%task%', task);
    finalHtml = finalHtml.replace('%description%', description);
    finalHtml = finalHtml.replace('%id%', id);
    document.querySelector("#my-tasks").insertAdjacentHTML('beforeend', finalHtml);
    DOMStrings.task.value = '';
    DOMStrings.description.value = '';
    id += 1;
}

var getInfos = () => {
    var check = 0;
    var task = DOMStrings.task.value;
    var description = DOMStrings.description.value;
    
    for (var i = 0; i < task.length; i++) {
        if (task[i] != ' ')
            check += 1;
    }
    if (check > 0) {
        DOMStrings.loadingGif.style.display = '';
        DOMStrings.form.style.display = 'none';
        addTask(task, description);
        DOMStrings.form.style.display = '';
        DOMStrings.loadingGif.style.display = 'none';
    }
}

DOMStrings.saveButton.addEventListener('click', getInfos);