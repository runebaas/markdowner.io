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
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn flat @click="toggleDark">
        <v-icon>invert_colors</v-icon>
        <span>Dark</span>
      </v-btn>
      <v-btn flat @click="toggleRendered">
        <v-icon>code</v-icon>
        <span>Render</span>
      </v-btn>
      <v-btn icon>
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
            <v-text-field
                    v-if="!rendered"
                    label="Markdown"
                    full-width
                    multi-line
                    v-model="output"
                    readonly
            ></v-text-field>
            <div v-else class="renderedMarkdown">
              <div v-html="renderedOutput"></div>
            </div>
        </v-flex>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
  import * as wiki2md from 'wikitext2markdown';
  import * as J2M from 'j2m';
  import * as rst2mdown from 'rst2mdown';
  import * as marked from 'marked';
  import * as htmlToMarkdown from 'to-markdown';
  import store from './store';

  export default {
    name: 'app',
    created() {
      this.selectedLang = store.state.settings.selectedLanguage;
      this.rendered = store.state.settings.renderMarkdown;
      this.useDarkTheme = store.state.settings.useDarkTheme;
      this.isLoading = false;
    },
    data() {
      return {
        input: '',
        isLoading: true,
        languages: [
          'reStructuredText',
          'WikiText',
          'JiraText',
          'HTML',
          'Markdown',
        ],
        selectedLang: 'reStructuredText',
      };
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
        return store.state.settings.renderMarkdown;
      },
      useDarkTheme() {
        return store.state.settings.useDarkTheme;
      },
    },
    watch: {
      selectedLang() {
        store.commit('setLanguage', this.selectedLang);
      },
    },
    methods: {
      toggleDark() {
        store.commit('toggleDarkTheme');
      },
      toggleRendered() {
        store.commit('toggleRenderMarkdown');
      },
    },
  };
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  textarea {
    height: 90vh;
  }

  .renderedMarkdown {
    height: 90vh;
    overflow: scroll;
  }
</style>
