const xss_filter = function(content) {
    switch (typeof content) {
        case 'string':
            return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            break;
        case 'object':
            if (Array.isArray(content)) {
                for (var i = 0; i < content.length; i++) {
                    if (typeof content[i] === 'object') {
                        content[i] = xss_filter(content[i]);
                    } else if (typeof content[i] === 'string') {
                        content[i] = content[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    }
                }
                return content;
            } else {
                return content;
            }
            break;
    }
};

module.exports = xss_filter;
