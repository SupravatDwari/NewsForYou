function downloadFile() {
    $.ajax({
        url: 'https://localhost:7235/api/FileDownload',
        type: 'POST',
        success: function (data, status, xhr) {
            if (xhr.status === 200) {
                var blob = new Blob([data], { type: 'text/csv' });

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'export.csv';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('Error downloading file');
            }
        },
        error: function () {
            alert('Error downloading file');
        }
    });
}
