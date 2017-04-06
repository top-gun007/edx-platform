define([
    'js/collections/group_configuration', 'js/models/group_configuration', 'js/views/pages/group_configurations'
], function(GroupConfigurationCollection, GroupConfigurationModel, GroupConfigurationsPage) {
    'use strict';
    return function(experimentsEnabled,
                    experimentGroupConfigurationsJson,
                    allGroupConfigurationJson,
                    groupConfigurationUrl,
                    courseOutlineUrl) {
        var experimentGroupConfigurations = new GroupConfigurationCollection(
                experimentGroupConfigurationsJson, {parse: true}
            ),
            allGroupConfigurations = [],
            i;

        for (i = 0; i < allGroupConfigurationJson.length; i++) {
            allGroupConfigurations.push(new GroupConfigurationModel(allGroupConfigurationJson[i],
                {parse: true, canBeEmpty: true})
            );
        }

        experimentGroupConfigurations.url = groupConfigurationUrl;
        experimentGroupConfigurations.outlineUrl = courseOutlineUrl;
        allGroupConfigurations.urlRoot = groupConfigurationUrl;
        allGroupConfigurations.outlineUrl = courseOutlineUrl;
        new GroupConfigurationsPage({
            el: $('#content'),
            experimentsEnabled: experimentsEnabled,
            experimentGroupConfigurations: experimentGroupConfigurations,
            allGroupConfigurations: allGroupConfigurations
        }).render();
    };
});
