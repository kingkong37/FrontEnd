jQuery.fn.toggleAttr = function (attribute, value) {
    value = value || attribute;
    return this.each(function () {
        var attr = jQuery(this).attr(attribute);
        if (typeof attr !== typeof undefined && attr !== false) {
            jQuery(this).removeAttr(attribute);
        }
        else {
            jQuery(this).attr(attribute, value);
        }
    });
};