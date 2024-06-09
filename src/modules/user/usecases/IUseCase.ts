//interface para padronizar os casos de uso

interface IUseCaseGeneralDto { status: number,message: string}

export interface IUseCase<InputDto, OutputDto extends IUseCaseGeneralDto> {
    execute(input: InputDto): Promise<OutputDto>
}