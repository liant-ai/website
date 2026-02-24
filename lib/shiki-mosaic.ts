/**
 * Mosaic Light — syntax theme using the liant mosaic palette.
 *
 * Base text is a warm muted grey. Only specific tokens get color:
 *   Amber (hue 75)     → strings, attributes
 *   Teal (hue 185)     → keywords, tags, functions
 *   Rose (hue 10)      → types, classes
 *   Deep-blue (hue 260) → comments
 *   Terracotta (hue 35) → constants, numbers
 */
export const mosaicLight = {
  name: 'mosaic-light',
  type: 'light' as const,
  colors: {
    'editor.background': '#fafaf8',
    'editor.foreground': '#4a4a48',
  },
  tokenColors: [
    // ── Base: catch-all for unscoped text ── warm grey
    {
      scope: ['source'],
      settings: { foreground: '#4a4a48' },
    },
    // ── Comments ── deep-blue
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#505088', fontStyle: 'italic' },
    },
    // ── Keywords ── teal
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'keyword.operator.logical',
        'variable.language.this',
        'variable.language.super',
      ],
      settings: { foreground: '#2e7a7a' },
    },
    // ── Strings ── amber
    {
      scope: ['string', 'string.template', 'punctuation.definition.string'],
      settings: { foreground: '#a07000' },
    },
    // ── Types / classes ── rose
    {
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.type',
        'support.class',
        'entity.name.class',
        'storage.type.class',
        'meta.type.annotation',
      ],
      settings: { foreground: '#a05858' },
    },
    // ── Function definitions ── teal
    {
      scope: [
        'entity.name.function',
        'support.function',
        'entity.name.method',
      ],
      settings: { foreground: '#3a8a8a' },
    },
    // ── Numbers / constants ── terracotta
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.character',
        'support.constant',
        'variable.other.enummember',
      ],
      settings: { foreground: '#a06840' },
    },
    // ── Variables / parameters ── warm grey (base)
    {
      scope: ['variable', 'variable.parameter', 'variable.other'],
      settings: { foreground: '#4a4a48' },
    },
    // ── Properties ── slightly darker grey
    {
      scope: ['variable.other.property', 'support.variable.property', 'meta.object-literal.key'],
      settings: { foreground: '#3d3d3a' },
    },
    // ── Tags (HTML/JSX) ── teal
    {
      scope: ['entity.name.tag', 'punctuation.definition.tag'],
      settings: { foreground: '#2e7a7a' },
    },
    // ── Attributes ── amber
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#a07000' },
    },
    // ── Operators / punctuation ── muted
    {
      scope: [
        'keyword.operator',
        'punctuation.separator',
        'punctuation.terminator',
        'meta.brace',
        'punctuation.bracket',
        'punctuation.definition.block',
        'punctuation.definition.parameters',
        'punctuation.section',
        'meta.function-call punctuation',
      ],
      settings: { foreground: '#737370' },
    },
    // ── Regex ── terracotta
    {
      scope: ['string.regexp'],
      settings: { foreground: '#a06840' },
    },
    // ── Escape sequences ── terracotta
    {
      scope: ['constant.character.escape'],
      settings: { foreground: '#a06840' },
    },
    // ── Decorators / annotations ── rose
    {
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: { foreground: '#a05858' },
    },
    // ── Shell: command names ── teal (not amber)
    {
      scope: [
        'entity.name.command',
        'support.function.builtin',
      ],
      settings: { foreground: '#3a8a8a' },
    },
    // ── Shell: options/flags ── muted grey
    {
      scope: [
        'variable.parameter.option',
        'punctuation.definition.parameter',
      ],
      settings: { foreground: '#737370' },
    },
    // ── Markdown headings ── teal
    {
      scope: ['markup.heading', 'entity.name.section'],
      settings: { foreground: '#2e7a7a' },
    },
    // ── Markdown bold ──
    {
      scope: ['markup.bold'],
      settings: { fontStyle: 'bold' },
    },
    // ── Markdown italic ──
    {
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic' },
    },
    // ── Markdown links ── amber
    {
      scope: ['markup.underline.link', 'string.other.link'],
      settings: { foreground: '#a07000' },
    },
    // ── Markdown code ── terracotta
    {
      scope: ['markup.inline.raw', 'markup.fenced_code'],
      settings: { foreground: '#a06840' },
    },
  ],
};

/**
 * Mosaic Dark — same hue mapping, lighter values for dark backgrounds.
 * Base text is a warm light grey.
 */
export const mosaicDark = {
  name: 'mosaic-dark',
  type: 'dark' as const,
  colors: {
    'editor.background': '#1a1a18',
    'editor.foreground': '#a3a3a0',
  },
  tokenColors: [
    // ── Base: catch-all ── warm grey
    {
      scope: ['source'],
      settings: { foreground: '#a3a3a0' },
    },
    // ── Comments ── deep-blue
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#8080c0', fontStyle: 'italic' },
    },
    // ── Keywords ── teal
    {
      scope: [
        'keyword',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'keyword.operator.logical',
        'variable.language.this',
        'variable.language.super',
      ],
      settings: { foreground: '#50b0b0' },
    },
    // ── Strings ── amber
    {
      scope: ['string', 'string.template', 'punctuation.definition.string'],
      settings: { foreground: '#dba020' },
    },
    // ── Types / classes ── rose
    {
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.type',
        'support.class',
        'entity.name.class',
        'storage.type.class',
        'meta.type.annotation',
      ],
      settings: { foreground: '#c08080' },
    },
    // ── Function definitions ── teal
    {
      scope: [
        'entity.name.function',
        'support.function',
        'entity.name.method',
      ],
      settings: { foreground: '#60c0c0' },
    },
    // ── Numbers / constants ── terracotta
    {
      scope: [
        'constant.numeric',
        'constant.language',
        'constant.character',
        'support.constant',
        'variable.other.enummember',
      ],
      settings: { foreground: '#c08060' },
    },
    // ── Variables / parameters ── warm grey (base)
    {
      scope: ['variable', 'variable.parameter', 'variable.other'],
      settings: { foreground: '#a3a3a0' },
    },
    // ── Properties ── slightly brighter grey
    {
      scope: ['variable.other.property', 'support.variable.property', 'meta.object-literal.key'],
      settings: { foreground: '#c0c0bd' },
    },
    // ── Tags (HTML/JSX) ── teal
    {
      scope: ['entity.name.tag', 'punctuation.definition.tag'],
      settings: { foreground: '#50b0b0' },
    },
    // ── Attributes ── amber
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#dba020' },
    },
    // ── Operators / punctuation ── muted
    {
      scope: [
        'keyword.operator',
        'punctuation.separator',
        'punctuation.terminator',
        'meta.brace',
        'punctuation.bracket',
        'punctuation.definition.block',
        'punctuation.definition.parameters',
        'punctuation.section',
        'meta.function-call punctuation',
      ],
      settings: { foreground: '#737370' },
    },
    // ── Regex ── terracotta
    {
      scope: ['string.regexp'],
      settings: { foreground: '#c08060' },
    },
    // ── Escape sequences ── terracotta
    {
      scope: ['constant.character.escape'],
      settings: { foreground: '#c08060' },
    },
    // ── Decorators / annotations ── rose
    {
      scope: ['meta.decorator', 'punctuation.decorator'],
      settings: { foreground: '#c08080' },
    },
    // ── Shell: command names ── teal (not amber)
    {
      scope: [
        'entity.name.command',
        'support.function.builtin',
      ],
      settings: { foreground: '#60c0c0' },
    },
    // ── Shell: options/flags ── muted grey
    {
      scope: [
        'variable.parameter.option',
        'punctuation.definition.parameter',
      ],
      settings: { foreground: '#737370' },
    },
    // ── Markdown headings ── teal
    {
      scope: ['markup.heading', 'entity.name.section'],
      settings: { foreground: '#50b0b0' },
    },
    // ── Markdown bold ──
    {
      scope: ['markup.bold'],
      settings: { fontStyle: 'bold' },
    },
    // ── Markdown italic ──
    {
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic' },
    },
    // ── Markdown links ── amber
    {
      scope: ['markup.underline.link', 'string.other.link'],
      settings: { foreground: '#dba020' },
    },
    // ── Markdown code ── terracotta
    {
      scope: ['markup.inline.raw', 'markup.fenced_code'],
      settings: { foreground: '#c08060' },
    },
  ],
};
