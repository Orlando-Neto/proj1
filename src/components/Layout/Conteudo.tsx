import MenuSuperior from "./MenuSuperior";

export default function Conteudo(props: any) {

	return (
		<div className="page-container">
			<div className="main-content">
				<div className="section__content section__content--p30">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-12">

								<MenuSuperior />

								<div className="card">
									<div className="card-header">
										<strong className="card-title">{props?.titulo}</strong>
									</div>

									<div className="card-body">
										{props.children}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}