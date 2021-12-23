import type {
  EvaluationResult,
  ProbeResult,
  Serializable,
} from '@spaceavocado/librarian'
import { AND, NOR, NOT, OR, TERM, XOR } from '@spaceavocado/librarian'
import type { Evaluable } from '@spaceavocado/librarian/types/core'

import { identity, ifElse, isString, isUndefined } from '../../common/fp'

const CSS_CLASS_EVALUABLE = 'evaluable'
const CSS_CLASS_TERM = `${CSS_CLASS_EVALUABLE} ${CSS_CLASS_EVALUABLE}--term`
const CSS_CLASS_AND = `${CSS_CLASS_EVALUABLE} ${CSS_CLASS_EVALUABLE}--and`
const CSS_CLASS_OR = `${CSS_CLASS_EVALUABLE} ${CSS_CLASS_EVALUABLE}--or`
const CSS_CLASS_XOR = `${CSS_CLASS_EVALUABLE} ${CSS_CLASS_EVALUABLE}--xor`
const CSS_CLASS_NOR = `${CSS_CLASS_EVALUABLE} ${CSS_CLASS_EVALUABLE}--nor`
const CSS_CLASS_NOT = `${CSS_CLASS_EVALUABLE} ${CSS_CLASS_EVALUABLE}--not`
const CSS_CLASS_RESULT = 'result'
const CSS_CLASS_MATCH = `${CSS_CLASS_RESULT} ${CSS_CLASS_RESULT}--match`
const CSS_CLASS_MISS = `${CSS_CLASS_RESULT} ${CSS_CLASS_RESULT}--miss`
const CSS_CLASS_SKIPPED = `${CSS_CLASS_RESULT} ${CSS_CLASS_RESULT}--skipped`

let formatEvaluable: (
  probe: ProbeResult,
  level: number
) => (...arg: Serializable[]) => string = undefined

const resultCssClass = (result: EvaluationResult | undefined, level: number) =>
  ((base) => `${base} ${base}--${level}`)(
    result === undefined
      ? CSS_CLASS_SKIPPED
      : result
      ? CSS_CLASS_MATCH
      : CSS_CLASS_MISS
  )

const probeResultById = (id: symbol, haystack: ProbeResult[]): ProbeResult =>
  ifElse(
    isUndefined,
    () => {
      throw new Error('missing probe result')
    },
    identity
  )(haystack.find((probe) => probe.id === id))

const evaluableId = (serializable: Serializable): symbol =>
  ifElse(
    isString,
    () => {
      throw new Error(`invalid Serializable: ${serializable}`)
    },
    (evaluable: Evaluable) => evaluable.id
  )(serializable)

const formatTerm =
  (probe: ProbeResult, level: number) => (serializable: Serializable) =>
    `<div class="${CSS_CLASS_TERM} ${resultCssClass(
      probe.result,
      level
    )}">"${serializable.toString()}"</div>`

const formatUnary =
  (operator: string, cssClass: string) =>
  (probe: ProbeResult, level: number) =>
  (operand: Serializable) =>
    `<div class="${cssClass} ${resultCssClass(
      probe.result,
      level
    )}">${operator} ${operand.toString(
      formatEvaluable(
        probeResultById(evaluableId(operand), probe.descendants ?? []),
        level - 1
      )
    )}</div>`

const formatLogical =
  (operator: string, cssClass: string) =>
  (probe: ProbeResult, level: number) =>
  (...operands: Serializable[]) =>
    `<div class="${cssClass} ${resultCssClass(
      probe.result,
      level
    )}">( ${operands
      .map((operand) =>
        operand.toString(
          formatEvaluable(
            probeResultById(evaluableId(operand), probe.descendants ?? []),
            level - 1
          )
        )
      )
      .join(` ${operator} `)} )</div>`

formatEvaluable = (
  probe: ProbeResult,
  level: number
): ((...arg: Serializable[]) => string) => {
  switch (probe.kind) {
    case TERM:
      return formatTerm(probe, level)
    case OR:
      return formatLogical('OR', CSS_CLASS_OR)(probe, level)
    case NOR:
      return formatLogical('NOR', CSS_CLASS_NOR)(probe, level)
    case XOR:
      return formatLogical('XOR', CSS_CLASS_XOR)(probe, level)
    case AND:
      return formatLogical('AND', CSS_CLASS_AND)(probe, level)
    case NOT:
      return formatUnary('NOT', CSS_CLASS_NOT)(probe, level)
    default:
      throw new Error(`unexpected kind "${probe.kind}"`)
  }
}

const depth = (probe: ProbeResult) => {
  const traverse = (probe: ProbeResult, level = 0): number =>
    Math.max(
      level,
      ...(probe.descendants ?? []).map((probe: ProbeResult) =>
        traverse(probe, level + 1)
      )
    )

  return traverse(probe)
}

export const probeHtml = (probe: ProbeResult) =>
  probe.toString(formatEvaluable(probe, depth(probe)))
