(function(define) {
    'use strict';

    define(['backbone',
            'jquery',
            'underscore',
            'gettext',
            'js/learner_dashboard/views/program_progress_view',
            'js/learner_dashboard/views/certificate_list_view',
            'text!../../../templates/learner_dashboard/program_details_sidebar.underscore'
           ],
         function(
             Backbone,
             $,
             _,
             gettext,
             ProgramProgressView,
             CertificateView,
             sidebarTpl
         ) {
             return Backbone.View.extend({
                 tpl: _.template(sidebarTpl),

                 initialize: function(options) {
                     this.courseModel = options.courseModel || {};
                     this.certificateCollection = options.certificateCollection || [];
                     this.programCertificate = this.getProgramCertificate();
                     this.render();
                 },

                 render: function() {
                     var data = $.extend({}, this.model.toJSON(), {
                        programCertificate: this.programCertificate ? this.programCertificate.toJSON() : {}
                     });

                     this.$el.html(this.tpl(data));
                     this.postRender();
                 },

                 postRender: function() {
                     if (!this.programCertificate) {
                         this.newProgramProgressView = new ProgramProgressView({
                             el: '.js-program-progress',
                             title: interpolate(
                                gettext('%(type)s Progress'),
                                {type: this.model.get('type')},
                                true
                             ),
                             label: gettext('Earned Certificates'),
                             progress: {
                                completed: this.courseModel.get('completed').length,
                                in_progress: this.courseModel.get('in_progress').length,
                                not_started: this.courseModel.get('not_started').length
                            }
                         });
                     }

                     if (this.certificateCollection.length) {
                         this.newCertificateView = new CertificateView({
                             el: '.js-course-certificates',
                             collection: this.certificateCollection,
                             title: gettext('Course Certificates')
                         });
                     }
                 },

                 getProgramCertificate: function() {
                    var certificate = this.certificateCollection.findWhere({type: 'program'});

                    if (certificate) {
                        certificate.set({
                            img: '/static/images/programs/program-certificate-' + this.model.get('type').toLowerCase() + '.jpg'
                        });
                    }

                    return certificate;
                 }
             });
         }
    );
}).call(this, define || RequireJS.define);
