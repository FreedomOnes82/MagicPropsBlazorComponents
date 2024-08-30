class OneToOneDragging {
    constructor(dragItem, targetContainer, settingsOpts) {
        this.draggableElement = dragItem;
        this.droppableElement = targetContainer;
        this.settingsOpts = settingsOpts;

        if (!this.draggableElement) {
            throw new Error('Draggable element not found');
        }

        this.init();
        this.addEventListeners();
    }

    init() {
        //this.startX = 0;
        //this.startY = 0;
        this.dragging = false;
        this.draggedItem = null;
        this.dragClone = null;
        this.droppingElement = null;
        this.originalStyle = '';

        this.draggableElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
    }

    addEventListeners() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }

    handleMouseDown(e) {
        const target = e.target || e.srcElement;
        this.dragClone = target.cloneNode(true);
        this.dragClone.style.position = 'absolute';
        this.dragClone.style.pointerEvents = 'none';
        this.dragClone.style.zIndex = '9999';
        this.draggedItem = target;
        document.body.appendChild(this.dragClone);

        //const rect = target.getBoundingClientRect();
        //this.startX = rect.left;
        //this.startY = rect.top;

        this.dragging = true;
    }

    handleMouseMove(e) {
        if (!this.dragging) return;

        const x = e.clientX;
        const y = e.clientY;
        this.dragClone.style.left = `${x}px`;
        this.dragClone.style.top = `${y}px`;
        //const dragItemRect = this.draggableElement.getBoundingClientRect();
        //const dragCloneCenterPoint = {
        //    centerX: x + dragItemRect.width / 2,
        //    centerY: y + dragItemRect.height / 2
        //};
        const droppableRect = this.droppableElement.getBoundingClientRect();
        //const isInDroppable = (
        //    dragCloneCenterPoint.centerX >= droppableRect.left &&
        //    dragCloneCenterPoint.centerX <= droppableRect.right &&
        //    dragCloneCenterPoint.centerY >= droppableRect.top &&
        //    dragCloneCenterPoint.centerY <= droppableRect.bottom
        //);
        const isInDroppable = (
            x >= droppableRect.left &&
            x <= droppableRect.right &&
            y >= droppableRect.top &&
            y <= droppableRect.bottom
        );

        if (isInDroppable && !this.droppingElement) {
            this.droppableMouseEnter();
        } else if (!isInDroppable && this.droppingElement) {
            this.droppableMouseOut();
        }
    }

    droppableMouseEnter() {
        this.droppableElement.style.boxShadow = "inset 0px 0px 5px 1px red";
        this.droppingElement = this.droppableElement;
    }

    droppableMouseOut() {
        this.droppableElement.style.boxShadow = "";
        this.droppingElement = null;
    }

    handleMouseUp(e) {
        e.stopPropagation();
        this.dragging = false;

        if (this.droppingElement && this.settingsOpts.droppingCallback) {
            this.settingsOpts.droppingCallback(this.draggedItem, this.dragClone, this.droppingElement);
        }

        if (this.dragClone) {
            document.body.removeChild(this.dragClone);
            this.dragClone = null;
        }

        if (this.droppingElement) {
            this.droppableMouseOut();
        }
    }
}

class ManyToManyDragging {
    constructor(dragItems, targetContainers, settingsOpts) {
        this.draggableElements = dragItems;
        this.droppableElements = targetContainers
        this.settingsOpts = settingsOpts;

       if (!this.draggableElements) {
            throw new Error("Draggable element not found");
        }

        this.init();
        this.addEventListeners();
    }

    init() {
        this.dragging = false;
        this.draggedItem = null;
        this.dragClone = null;
        this.droppingElements = []; // Track multiple dropping elements
        this.originalStyle = "";
        
        for (let i = 0; i < this.draggableElements.length; i++) {
           this.draggableElements[i].addEventListener(
             "mousedown",
             this.handleMouseDown.bind(this)
           );
         }
        //this.draggableElements.forEach((item) => {
         //   item.addEventListener("mousedown", this.handleMouseDown.bind(this));
       // });
    }

    addEventListeners() {
        document.addEventListener(
            "mousemove",
            this.handleMouseMove.bind(this)
        );
        document.addEventListener("mouseup", this.handleMouseUp.bind(this));
    }

    handleMouseDown(e) {
        const target = e.target || e.srcElement;
        this.dragClone = target.cloneNode(true);
        this.dragClone.style.position = "absolute";
        this.dragClone.style.pointerEvents = "none";
        this.dragClone.style.zIndex = "9999";
        this.draggedItem = target;
        document.body.appendChild(this.dragClone);

        this.dragging = true;
    }

    handleMouseMove(e) {
        if (!this.dragging) return;
        const x = e.clientX;
        const y = e.clientY;
        this.dragClone.style.left = `${x}px`;
        this.dragClone.style.top = `${y}px`;
        this.droppableElements.forEach((container) => {
            const droppableRect = container.getBoundingClientRect();
            const isInDroppable =
                x >= droppableRect.left &&
                x <= droppableRect.right &&
                y >= droppableRect.top &&
                y <= droppableRect.bottom;

            const index = this.droppingElements.indexOf(container);
            if (isInDroppable && index === -1) {
                this.droppingElements.push(container);
                this.droppableMouseEnter(container);
            } else if (!isInDroppable && index !== -1) {
                this.droppingElements.splice(index, 1);
                this.droppableMouseOut(container);
            }
        });
    }

    droppableMouseEnter(container) {
        container.style.boxShadow = "inset 0px 0px 5px 1px rgba(0,0,0,.5)";
    }

    droppableMouseOut(container) {
        container.style.boxShadow = "";
    }

    handleMouseUp(e) {
        e.stopPropagation();
        this.dragging = false;

        this.droppingElements.forEach((container) => {
            if (this.settingsOpts.droppingCallback) {
                this.settingsOpts.droppingCallback(
                    this.draggedItem,
                    container
                );
            }
            this.droppableMouseOut(container);
        });

        if (this.dragClone) {
            document.body.removeChild(this.dragClone);
            this.dragClone = null;
        }

        this.droppingElements = [];
    }
}
