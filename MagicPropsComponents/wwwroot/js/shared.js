window.dotnetRefs = {};

window.registerDotNetMethod = async (id, dotnetRef) => {
    if (!dotnetRef) {
        console.error('Attempted to register a null or undefined dotnetRef for id', id);
        return;
    }
    if (window.dotnetRefs[id]) {
        console.warn(`A dotnetRef for id ${id} already exists. The previous dotnetRef has been overwritten.`);
    }
    window.dotnetRefs[id] = dotnetRef;
};

window.getDotNetRef = (id) => {
    return window.dotnetRefs[id];
};

window.releaseDotNetRef = (id) => {
    const ref = window.dotnetRefs[id];
    if (ref) {
        //console.log("Releasing dotnetRef:", ref);
        window.dotnetRefs[id] = null;
    }
};

window.downloadFile = function (filename, type, data) {
    let blob = new Blob([data], { type });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(function () { window.URL.revokeObjectURL(url); }, 100);
};



function guid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}