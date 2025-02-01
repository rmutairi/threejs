var SCROLL_OFFSET_POSITION = 26;
var SCROLL_OFFSET_ROTATE = 500;

var portfolio_link = document.getElementById("portfolio-link");
var loader_screen = document.getElementById("loader");

function update_controls(model, skysphere, myscrollbar) {
    if (model && skysphere) {
        let scrollOffset;
        if (typeof myscrollbar != "undefined") {
            scrollOffset = myscrollbar.offset.y;
        } else {
            scrollOffset = document.getElementById('content').scrollTop;
        }

        // Update model position and rotation
        model.position.y = scrollOffset / SCROLL_OFFSET_POSITION;
        model.rotation.y = scrollOffset / SCROLL_OFFSET_ROTATE;

        // Update skysphere rotation (only rotate around the Y-axis)
        skysphere.rotation.y = scrollOffset / SCROLL_OFFSET_ROTATE;

        // Show portfolio link at the end
        if (model.position.y >= 604) {
            portfolio_link.style.visibility = 'visible';
            portfolio_link.style.pointerEvents = 'auto';
        } else {
            portfolio_link.style.visibility = 'hidden';
            portfolio_link.style.pointerEvents = 'none';
        }
        loader_screen.style.visibility = 'hidden';
    } else {
        loader_screen.style.visibility = 'visible';
    }
}

export {
    update_controls
};
