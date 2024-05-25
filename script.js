document.addEventListener('DOMContentLoaded', function() {
    // Função para filtrar resultados com base no texto do h2
    function searchGames() {
        var input, filter, sections, title;
        input = document.getElementById('searchInput');
        filter = input.value.toUpperCase();
        sections = document.querySelectorAll('.game');
        
        sections.forEach(function(section) {
            title = section.querySelector('h2').textContent || section.querySelector('h2').innerText;
            if (title.toUpperCase().indexOf(filter) > -1) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Função debounce para otimizar a pesquisa
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Adiciona um listener para o evento input na barra de pesquisa com debounce
    document.getElementById('searchInput').addEventListener('input', debounce(searchGames, 300));

    // Modal functionality
    var modal = document.getElementById('myModal');
    var modalClose = document.querySelector('.modal .close');
    var modalTitle = document.getElementById('modalTitle');
    var modalIframe = document.querySelector('.modal iframe');

    document.querySelectorAll('.game-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var url = this.href;
            var title = this.querySelector('h2').innerText;
            modalIframe.src = url;
            modalTitle.textContent = title;
            modal.style.display = 'block';
        });
    });

    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        modalIframe.src = '';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalIframe.src = '';
        }
    });
});
