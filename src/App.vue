<template>
  <v-app id="inspire" :dark="useDarkTheme">
    <v-toolbar
      app
      clipped-left
      fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">Markdowner <span>Alpha</span></v-toolbar-title>

      <v-select
              v-bind:items="languages"
              v-model="selectedLang"
              label="Select"
              single-line
              bottom
              style="margin-top: 25px"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn flat @click="applyUpdate" v-if="hasUpdate">
        <v-icon>cached</v-icon>
        <span>Update</span>
      </v-btn>
      <v-btn flat @click="toggleDark">
        <v-icon>invert_colors</v-icon>
        <span>Dark</span>
      </v-btn>
      <v-btn flat @click="toggleRendered">
        <v-icon>code</v-icon>
        <span>Render</span>
      </v-btn>
      <v-btn icon @click.native.stop="dialog = true">
        <v-icon>info</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <v-flex xs6>
            <v-text-field
                    :label="this.selectedLang"
                    v-model="input"
                    full-width
                    multi-line
                    autofocus
            ></v-text-field>
          </v-flex>
          <v-flex xs6>
            <!--<v-text-field-->
                    <!--v-if="!rendered"-->
                    <!--label="Markdown"-->
                    <!--full-width-->
                    <!--multi-line-->
                    <!--v-model="output"-->
                    <!--readonly-->
            <!--;</v-text-field>-->
            <pre v-if="!rendered" class="highlightedMarkdown" v-highlightjs="output"><code class="markdown" :style="codeColor"></code></pre>
            <div v-else class="renderedMarkdown">
              <div v-html="renderedOutput"></div>
            </div>
        </v-flex>
        </v-container>
      </v-content>
    </main>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">Markdowner Alpha</v-card-title>
        <v-card-text>Markdowner is an open source tool to edit markdown and convert a set of other markup languages to markdown</v-card-text>
        <v-card-actions>
          <span>Version {{ version }}</span>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" href="https://github.com/runebaas/markdowner.io" target="_blank">Github</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import * as wiki2md from 'wikitext2markdown';
  import * as J2M from 'j2m';
  import * as rst2mdown from 'rst2mdown';
  import * as marked from 'marked';
  import * as htmlToMarkdown from 'to-markdown';

  export default {
    name: 'app',
    data() {
      return {
        input: '',
        languages: [
          'reStructuredText',
          'WikiText',
          'JiraText',
          'HTML',
          'Markdown',
        ],
        selectedLang: 'reStructuredText',
        dialog: false,
      };
    },
    created() {
      this.selectedLang = Vue.$store.state.settings.selectedLanguage;
    },
    computed: {
      output() {
        switch (this.selectedLang.toLowerCase()) {
          case 'wikitext':
            return wiki2md(this.input);
          case 'jiratext':
            return J2M.toM(this.input);
          case 'reStructuredText':
            return rst2mdown(this.input);
          case 'HTML':
            return htmlToMarkdown(this.input);
          case 'markdown':
            return this.input;
          default:
            return this.input;
        }
      },
      renderedOutput() {
        return marked(this.output);
      },
      rendered() {
        return Vue.$store.state.settings.renderMarkdown;
      },
      useDarkTheme() {
        return Vue.$store.state.settings.useDarkTheme;
      },
      hasUpdate() {
        return Vue.$store.state.hasUpdate;
      },
      version() {
        return GIT_INFO !== null ? GIT_INFO.commitHashShort : 'dev';
      },
      codeColor() {
        const lightColor = 'font-size: 100%; background-color: #fafafa; color: rgba(0,0,0,.87);';
        const darkColors = 'font-size: 100%; background-color: #303030;';
        return this.useDarkTheme ? darkColors : lightColor;
      },
    },
    watch: {
      selectedLang() {
        Vue.$store.commit('setLanguage', this.selectedLang);
      },
    },
    methods: {
      toggleDark() {
        Vue.$store.commit('toggleDarkTheme');
      },
      toggleRendered() {
        Vue.$store.commit('toggleRenderMarkdown');
      },
      applyUpdate() {
        window.location.reload();
      },
    },
  };
</script>

<style lang="scss">
  @import "~vuetify/dist/vuetify.min.css";
  body {
    margin: 0;
    overflow: hidden;
  }

  textarea {
    height: 90vh;
  }

  .highlightedMarkdown {
    height: 90vh;
    overflow: auto;
  }

  .renderedMarkdown {
    height: 90vh;
    overflow: auto;
    h1 {
      font-size: 5em;
    }
    h2 {
      font-size: 4em;
    }
    h3 {
      font-size: 3em;
    }
    h4 {
      font-size: 2em;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
